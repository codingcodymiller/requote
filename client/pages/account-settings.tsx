import React, { useContext } from "react";
import SectionHeader from "../components/section-header";
import ChangeUsernameForm from "../components/change-username-form";
import LogoutButton from "../components/logout-button";
import { UserContext } from "../app";

export default function AccountSettings() {
  const { username } = useContext(UserContext);

  return (
    <>
      <SectionHeader text={`${username} Account Settings`} />
      <div className="row justify-content-center align-items-center">
        <ChangeUsernameForm />
        <div className="col-12 my-5 d-flex justify-content-center">
          <LogoutButton />
        </div>
      </div>
    </>
  )
}
