import React from 'react'

const AdminLogin = () => {
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h2>SignIn</h2>
                <label for="email">Email</label>
                <input type="text" name="email" required
                    value={value.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                />
                <div class="email error"></div>
                <label for="password">password</label>
                <input type="password" name="password" required
                    value={value.password}
                    onChange={(e) => handleChange("password", e.target.value)}
                />
                <div class="password error"></div>
                <button>Log In </button>
            </form>
            <Link to="/">Home</Link>
        </div>
    )
}

export default AdminLogin
