create database nelisa;

use nelisa;

create table categories(
	id int not null auto_increment,
	cat_name varchar(45),
	primary key(id)
)


create table suppliers (
	id int not null auto_increment,
	supplier varchar(45),
	primary key(id)

)


create table products (
	id int not null auto_increment,
	cat_id int,
	name varchar(100),
	primary key (id),
	foreign key(cat_id) references categories(id)
)


create table sales (
	id int not null auto_increment,
	prod_id int,
	sale_date date,
	quantity int(11),
	price decimal(10.2),
	primary key (id),
	foreign key (prod_id) references products(id)
)

create table purchases(
	id int not null auto_increment,
	prod_id int not null,
	supp_id int not null,
	purchase_date date,
	cost int(11),
	quantity int(11),
	primary key(id),
	foreign key(prod_id) references products(id),
	foreign key(supp_id) references suppliers(id)
)