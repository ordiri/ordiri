# frozen_string_literal: true

# Load "path" as a rackup file.
#
# The default is "config.ru".
#
rackup '/srv/gitlab/config.ru'
pidfile "#{ENV['HOME']}/puma.pid"
state_path "#{ENV['HOME']}/puma.state"

stdout_redirect '/srv/gitlab/log/puma.stdout.log',
  '/srv/gitlab/log/puma.stderr.log',
  true

# Configure "min" to be the minimum number of threads to use to answer
# requests and "max" the maximum.
#
# The default is "0, 16".
#
threads (ENV['PUMA_THREADS_MIN'] ||= '1').to_i , (ENV['PUMA_THREADS_MAX'] ||= '16').to_i

# By default, workers accept all requests and queue them to pass to handlers.
# When false, workers accept the number of simultaneous requests configured.
#
# Queueing requests generally improves performance, but can cause deadlocks if
# the app is waiting on a request to itself. See https://github.com/puma/puma/issues/612
#
# When set to false this may require a reverse proxy to handle slow clients and
# queue requests before they reach puma. This is due to disabling HTTP keepalive
queue_requests false

# Bind the server to "url". "tcp://", "unix://" and "ssl://" are the only
# accepted protocols.
bind "tcp://[::]:#{ENV['INTERNAL_PORT'] ||= '8080'}"

workers (ENV['WORKER_PROCESSES'] ||= '3').to_i

require_relative "/srv/gitlab/lib/gitlab/cluster/lifecycle_events"
require_relative "/srv/gitlab/lib/gitlab/cluster/puma_worker_killer_initializer"

on_restart do
  # Signal application hooks that we're about to restart
  Gitlab::Cluster::LifecycleEvents.do_before_master_restart
end

before_fork do
  # Signal to the puma killer
  Gitlab::Cluster::PumaWorkerKillerInitializer.start(
      @config.options,
      puma_per_worker_max_memory_mb: (ENV['PUMA_WORKER_MAX_MEMORY'] ||= '1024').to_i
  ) unless ENV['DISABLE_PUMA_WORKER_KILLER']

  # Signal application hooks that we're about to fork
  Gitlab::Cluster::LifecycleEvents.do_before_fork
end

Gitlab::Cluster::LifecycleEvents.set_puma_options @config.options
on_worker_boot do
  # Signal application hooks of worker start
  Gitlab::Cluster::LifecycleEvents.do_worker_start
end

# Preload the application before starting the workers; this conflicts with
# phased restart feature. (off by default)
preload_app!

tag 'gitlab-puma-worker'

# Verifies that all workers have checked in to the master process within
# the given timeout. If not the worker process will be restarted. Default
# value is 60 seconds.
#
worker_timeout (ENV['WORKER_TIMEOUT'] ||= '60').to_i

# https://github.com/puma/puma/blob/master/5.0-Upgrade.md#lower-latency-better-throughput
wait_for_less_busy_worker (ENV['PUMA_WAIT_FOR_LESS_BUSY_WORKER'] ||= '0.001').to_f

# https://github.com/puma/puma/blob/master/5.0-Upgrade.md#nakayoshi_fork
nakayoshi_fork unless ENV['DISABLE_PUMA_NAKAYOSHI_FORK'] == 'true'

# Use json formatter
require_relative "/srv/gitlab/lib/gitlab/puma_logging/json_formatter"

json_formatter = Gitlab::PumaLogging::JSONFormatter.new
log_formatter do |str|
  json_formatter.call(str)
end

lowlevel_error_handler do |ex, env|
  if Raven.configuration.capture_allowed?
    Raven.capture_exception(ex, tags: { 'handler': 'puma_low_level' }, extra: { puma_env: env })
  end

  # note the below is just a Rack response
  [500, {}, ["An error has occurred and reported in the system's low-level error handler."]]
end