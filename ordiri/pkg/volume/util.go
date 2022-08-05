package volume

import "fmt"

const DiskPrefix = "vd"

var diskLetters = []rune("abcdefghijklmnopqrstuvwxyz")

// diskLetterForIndex return diskLetters for index
func DiskNameForIndex(i int) string {
	return fmt.Sprintf("%s%s", DiskPrefix, DiskLetterForIndex(i))
}

func DiskLetterForIndex(i int) string {

	q := i / len(diskLetters)
	r := i % len(diskLetters)
	letter := diskLetters[r]

	if q == 0 {
		return fmt.Sprintf("%c", letter)
	}

	return fmt.Sprintf("%s%c", DiskLetterForIndex(q-1), letter)
}
