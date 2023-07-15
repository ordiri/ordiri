package aggregator

import (
	"sync"

	"github.com/ordiri/ordiri-netplot/pkg/collector"
)

type (
	AggregatorIfaceConfig struct {
		Name    string
		Enabled bool
		Filter  string
	}

	AggregatorSession struct {
		IfaceConfig []*AggregatorIfaceConfig
		pc          chan collector.Packet
		once        sync.Once
	}
)

func (as *AggregatorSession) Stop() {
	as.once.Do(func() {
		close(as.pc)
	})
}

func (as *AggregatorSession) Recorder() chan collector.Packet {
	return as.pc
}
