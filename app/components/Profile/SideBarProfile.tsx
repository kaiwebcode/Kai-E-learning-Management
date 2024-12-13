import React, { FC } from "react";

type Props = {
  user: any;
};

const SideBarProfile: FC<Props> = ({ user }) => {
  return <div>{user.name}</div>;
};

export default SideBarProfile;
