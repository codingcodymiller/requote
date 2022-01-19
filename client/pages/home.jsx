import React from 'react';

export default function Home(props) {
  return (
    <>
      <div id="g_id_onload"
        data-client_id="134612630348-qk1nv99sbsd3aghsvbe259m36tnolciu.apps.googleusercontent.com"
        data-context="signin"
        data-ux_mode="popup"
        data-login_uri="https://requote-app.herokuapp.com/auth"
        data-auto_select="true">
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
