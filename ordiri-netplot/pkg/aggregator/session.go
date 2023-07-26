package aggregator

import (
	"sync"
)

type (
	AggregatorIfaceConfig struct {
		Name    string
		Enabled bool
		Filter  string
	}

	AggregatorSession struct {
		IfaceConfig []*AggregatorIfaceConfig
		pc          chan AggregatedPacket
		once        sync.Once
	}
)

func (as *AggregatorSession) Stop() {
	as.once.Do(func() {
		close(as.pc)
	})
}

func (as *AggregatorSession) Recorder() chan AggregatedPacket {
	return as.pc
}
