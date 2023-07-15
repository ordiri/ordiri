package aggregator

import (
	"fmt"
	"sync"

	"github.com/gobwas/glob"
	"github.com/ordiri/ordiri-netplot/pkg/collector"
)

type (
	Aggregator struct {
		sessions map[string]*AggregatorSession
		l        sync.Mutex
		Packets  chan collector.Packet
	}
)

func (a *Aggregator) GetStats() string {
	str := "Stats:\n---\nSessions:\n"
	for name, sess := range a.sessions {
		str += fmt.Sprintf("%s: \n", name)
		for _, iface := range sess.IfaceConfig {
			str += fmt.Sprintf("\t%s: %v\n", iface.Name, iface.Enabled)
		}
		str += "\n"
	}
	str += "---\n"

	return str
}

func (a *Aggregator) RemoveSession(id string) {
	a.l.Lock()
	defer a.l.Unlock()
	if sess, ok := a.sessions[id]; ok {
		sess.Stop()
		delete(a.sessions, id)
	}
}

func (a *Aggregator) GlobSession(pattern string) []*AggregatorSession {
	a.l.Lock()
	defer a.l.Unlock()
	g, err := glob.Compile(pattern)
	if err != nil {
		return nil
	}
	matching := []*AggregatorSession{}
	for id, sess := range a.sessions {
		if g.Match(id) {
			matching = append(matching, sess)
		}
	}
	return matching
}

func (a *Aggregator) GetSession(id string) *AggregatorSession {
	a.l.Lock()
	defer a.l.Unlock()
	if sess, ok := a.sessions[id]; ok {
		return sess
	}
	return nil
}

func (a *Aggregator) AddSession(id string) *AggregatorSession {
	a.l.Lock()
	defer a.l.Unlock()

	if sess, ok := a.sessions[id]; ok {
		return sess
	}

	sess := &AggregatorSession{
		pc:          make(chan collector.Packet),
		IfaceConfig: []*AggregatorIfaceConfig{},
	}

	go func() {
		for p := range sess.pc {
			a.Packets <- p
		}
	}()
	a.sessions[id] = sess
	return sess
}

func NewAggregator() *Aggregator {
	return &Aggregator{
		sessions: make(map[string]*AggregatorSession),
	}
}
