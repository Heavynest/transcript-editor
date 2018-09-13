/*create table USER(
  userid int identity(1,1) primary key,
  accountName varchar(250) not null,
  password varchar(250) not null
);

create table CLASS(
  classid numprimary key,
  className varchar(250) not null,
  sessionName varchar(250) not null
);

create table ENROLLMENT(
  userid int not null,
  classid int not null,
  foreign key(userid) references user,
  foreign key(classid) references class,
  primary key(userid, classid)
);

create table transcript(
  tid int not null,
  day date not null,
  media varchar(250) not null,
  vtt varchar(250) not null,
  primary key(tid)
);

create table cltranscript(
  classid int not null,
  tid int not null,
  foreign key(classid) references class,
  foreign key(tid) references transcript,
  primary key(classid,tid)
);*/

create table selftranscript(
  userid int not null,
  tid int not null,
  filevtt varchar(250),
  foreign key(userid) references user,
  foreign key(tid) references transcript,
  primary key(userid,tid)
)
