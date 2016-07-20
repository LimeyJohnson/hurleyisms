var auth = function () {
    var auth = {};
    var validateRegisterForm = function () {
        return $("#signup-modal input[type=email]").emailify() &&
            $("#signup-modal input[required]").requirify();


    }
    auth.register = function (e) {
        e.preventDefault();
        //this line isn't needed as validate will remove all users
        //$("#signup-modal input[required]").removeError();
        if (validateRegisterForm()) {
            var user = {};
            user.email = $("#email").val();
            user.password = $("#password").val();
            user.name = $("#name").val();
            $.post('auth/register', user)
                .done(function (data) {
                    $("#btn_register").hide();
                    $("#btn_checkout").show();

            })
                .error(function (error) {
                    $("#signup-modal input[type=email]").addError("This email has already been taken.  <a href='#' data-modal='login-modal'>Login</a> if it's yours");
                });
        }
    }
    var validateLogInForm = function () {
        return $("#login-modal input[type=email]").emailify() &&
            $("#login-modal input[required]").requirify();
    } 
    auth.login = function ()
    {
        if(validateLogInForm){
            var user = {};
            user.email = $("#login__email-address").val().toLowerCase();
            user.password = $("#login__password").val();
            $.post('auth/login', user).done(function (data) {
                document.location.href = '/app';
            }).error(function (error) { 
                $("#login-modal input[type=email]").addError("Email or password incorrect");
        });
        }
    }
    auth.logout = function()
    {
        $.post('auth/logout').done(function () {
            document.location.href = '/';
        });
    }
    

    auth.cancel = function () {
        $.post('auth/cancel').done(function () {
            document.location.href = '/my-account';
        });
    }
    auth.updateEmailAddress = function (email, callback) {
        $.post('auth/email', { email: email }).done(function () {
            callback();
        });
    }
    auth.updatePassword = function (password, callback) {
        $.post('auth/password', { password: password }).done(function () {
            callback();
        });
    }

    auth.isLoggedIn = function () {
        var token = getToken();
        if (token) {
            var payload = JSON.parse(window.atob(token.split('.')[1]));
            return payload.exp > Date.now() / 1000;
        } else {
            return false;
        }
    };

    auth.isAdmin = function () {
        var token = getToken();
        if (token) {
            var payload = JSON.parse(window.atob(token.split('.')[1]));
            return payload.exp > Date.now() / 1000 && payload.admin;
        } else {
            return false;
        }
    };

    auth.isMonthly = function () {
        var token = getToken();
        if (token) {
            var payload = JSON.parse(window.atob(token.split('.')[1]));
            return payload.exp > Date.now() / 1000 && payload.type === "monthly";
        } else {
            return false;
        }
    };

    auth.isLifeTime = function () {
        var token = getToken();
        if (token) {
            var payload = JSON.parse(window.atob(token.split('.')[1]));
            return payload.exp > Date.now() / 1000 && payload.type === "lifetime";
        } else {
            return false;
        }
    };

    auth.loggedInEmail = function () {
        var token = getToken();
        if (token) {
            var payload = JSON.parse(window.atob(token.split('.')[1]));
            if (payload.exp > Date.now() / 1000) return payload.email;
            return null;
        } else {
            return null;
        }
    };

    auth.hasVerifiedEmail = function () {
        var token = getToken();
        if (token) {
            var payload = JSON.parse(window.atob(token.split('.')[1]));
            if (payload.exp > Date.now() / 1000) return payload.emailverified;
            return null;
        } else {
            return null;
        }
    };

    auth.proDate = function () {
        var token = getToken();
        if (token) {
            var payload = JSON.parse(window.atob(token.split('.')[1]));
            if (payload.exp > Date.now() / 1000) return new Date(payload.prodate);
            return null;
        } else {
            return null;
        }
    };

    auth.isPro = function () {
        var token = getToken();
        if (token) {
            var payload = JSON.parse(window.atob(token.split('.')[1]));
            if (payload.exp > Date.now() / 1000) return payload.pro;
            return null;
        } else {
            return null;
        }
    };
    

    var getToken = function () {
        return getCookie("auth");
    };

    getCookie = function(cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return null;
    }
    return auth;
}();