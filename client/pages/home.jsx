import React from 'react';

export default function Home(props) {
  return (
    <>
      <div id="g_id_onload"
        data-client_id="516443787558-dh2dj2qpjm8sm9u301pt3ur5ki8balrg.apps.googleusercontent.com"
        data-context="signin"
        data-ux_mode="popup"
        data-login_uri="http://localhost:3000/api/login"
        data-auto_prompt="false">
      </div>

      <div className="g_id_signin"
        data-type="standard"
        data-shape="rectangular"
        data-theme="filled_blue"
        data-text="signin_with"
        data-size="large"
        data-logo_alignment="left"
        data-width="120px">
      </div>
    </>
  );
}
