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
      <ChangeUsernameForm />
      <div className="d-flex my-5 justify-content-center">
        <LogoutButton />
      </div>
    </>
  )
}
