/*
Copyright © 2022 NAME HERE <EMAIL ADDRESS>
*/
package cmd

import (
	"os"

	"github.com/spf13/cobra"
)

// rootCmd represents the provision command
var rootCmd = &cobra.Command{
	Use:   "ordiri-networkd",
	Short: "Network driver daemon",
	Long: `Network Driver Daemon for Ordiri
	
Interact and modify the SDN layer`,
}

func Execute() {
	err := rootCmd.Execute()
	if err != nil {
		os.Exit(1)
	}
}
