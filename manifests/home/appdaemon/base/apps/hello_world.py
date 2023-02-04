import hassapi as hass

#
# Hello World App
#
# Args:
#


class HelloWorld(hass.Hass):
    def initialize(self):
        self.log("Hello from AppDaemon")
        self.log("You are now ready to run Apps!")
        self.log("Got the switch status %s" % self.entities.switch.tp_link_smart_plug_c659)