"use client";
import { useState } from "react";
import ProfileDrop from "@utils/ProfileDrop";
import BasicInfo from "./basicinfo";
import Email from "./email";
import Password from "./password";
import DeleteAccount from "./delete";

export default function Profile() {
  const [tab, setTab] = useState(0);
  return (
    <div className="flex flex-col">
      <div className="p-5 bg-base-100 flex flex-col items-end">
        <ProfileDrop />
      </div>

      <div className="flex flex-row gap-10 items-start p-5 lg:p-32">
        <ul className="menu bg-base-200 p-2 rounded-box w-56">
          <li>
            <a className={tab == 0 ? `active` : ""} onClick={() => setTab(0)}>
              <i className="ri-user-line" /> Profile
            </a>
          </li>
          <li>
            <a className={tab == 1 ? `active` : ""} onClick={() => setTab(1)}>
              <i className="ri-mail-line" /> Email
            </a>
          </li>
          <li>
            <a className={tab == 2 ? `active` : ""} onClick={() => setTab(2)}>
              <i className="ri-key-2-line" /> Password
            </a>
          </li>
          <li>
            <a
              className={tab == 3 ? `active` : "text-error"}
              onClick={() => setTab(3)}
            >
              <i className="ri-close-circle-line" /> Delete Account
            </a>
          </li>
        </ul>

        <div>
          {tab == 0 ? <BasicInfo /> : null}
          {tab == 1 ? <Email /> : null}
          {tab == 2 ? <Password /> : null}
          {tab == 3 ? <DeleteAccount /> : null}
        </div>
      </div>
    </div>
  );
}
