import './loginPanel.css'

function LoginPanel() {
    return(
        <div className="login_panel">
            <div className="logo-login"></div>
            <span className="login-title">Login</span>
            <p>to access your dashboard</p>
            <a>
                <div className="blue_button-login">
                    <div className="discord_icon-login"></div>
                    <span className="blue_button-login-text">Login with Discord</span>
                </div>
            </a>

        </div>
    )
}

export default LoginPanel;