package authentication

type AuthenticationService interface {
	AuthenticateUser(email string, password string) bool
}
type authenticationInformation struct {
	email    string
	password string
}

func StaticAuthenticationService() AuthenticationService {
	return &authenticationInformation{
		email:    "cisco@snek.at",
		password: "ciscocisco",
	}
}

func DynamicAuthenticationService() AuthenticationService {
	return &authenticationInformation{
		email:    "cisco@snek.at",
		password: "ciscocisco",
	}
}

func (info *authenticationInformation) AuthenticateUser(email string, password string) bool {
	return info.email == email && info.password == password
}
