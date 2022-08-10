/*
Copyright © 2022 NAME HERE <EMAIL ADDRESS>

*/
package cmd

import (
	"fmt"

	token "auth/internal/auth_token"
	authentication "auth/internal/authentication"

	"github.com/spf13/cobra"
)

// getTokenCmd represents the getToken command
var getTokenCmd = &cobra.Command{
	Use:   "getToken",
	Short: "A brief description of your command",
	Long: `A longer description that spans multiple lines and likely contains examples
and usage of using your command. For example:

Cobra is a CLI library for Go that empowers applications.
This application is a tool to generate the needed files
to quickly create a Cobra application.`,
	Run: func(cmd *cobra.Command, args []string) {
		fmt.Println(authentication.StaticAuthenticationService().AuthenticateUser("cisco@snek.at", "ciscocisco"))
		fmt.Println(token.JWTAuthService().GenerateToken(args[0], true))
	},
}

func init() {
	rootCmd.AddCommand(getTokenCmd)

	// Here you will define your flags and configuration settings.

	// Cobra supports Persistent Flags which will work for this command
	// and all subcommands, e.g.:
	// getTokenCmd.PersistentFlags().String("foo", "", "A help for foo")

	// Cobra supports local flags which will only run when this command
	// is called directly, e.g.:
	// getTokenCmd.Flags().BoolP("toggle", "t", false, "Help message for toggle")
}
