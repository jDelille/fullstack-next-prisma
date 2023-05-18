'use client'

import { Notification } from "@prisma/client";

type NotificationProps = {
 id: string;
 body: Notification;
 className: string;
}


const Notification: React.FC<NotificationProps> = ({ id, body, className }) => {
 return (
  <div key={id} className={className}>{body.body}</div>
 );
}

export default Notification;