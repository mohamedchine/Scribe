const getRecaptchaToken = async (actionname) => {
    return await window.grecaptcha.execute(
      process.env.REACT_APP_RECAPTCHA_SITE_KEY,
      { action: actionname}
    );
  };
export {getRecaptchaToken};