create database pj;
use pj;
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '210920';
flush privileges;
drop table laptop;
create table laptops(
 id int primary key not null,
 name varchar(255) not null,
 cpu varchar(255),
 ram varchar(255),
 price int not null,
 image varchar(255) not null,
 other varchar(255)
);

INSERT INTO `pj`.`laptops` (`id`, `name`, `cpu`, `ram`, `price`, image) VALUES ('1', 'Macbook Air 2020', 'M1', '8GB', '30990000' , 'https://macone.vn/wp-content/uploads/2020/11/macbook-air-gold-m1-2020.jpeg');
INSERT INTO `pj`.`laptops` (`id`, `name`, `cpu`, `ram`, `price`, image) VALUES ('2', 'Macbook Pro 2020', 'M1', '8BG', '27790000', 'https://macone.vn/wp-content/uploads/2020/11/macbook-air-gold-m1-2020.jpeg');
INSERT INTO `pj`.`laptops` (`id`, `name`, `cpu`, `ram`, `price`, image) VALUES ('3', 'Macbook Air 2021', 'M1', '8BG', '25490000', 'https://macone.vn/wp-content/uploads/2020/11/macbook-air-gold-m1-2020.jpeg');
INSERT INTO `pj`.`laptops` (`id`, `name`, `cpu`, `ram`, `price`, image) VALUES ('4', 'Macbook Pro 2021', 'M1', '16BG', '35990000', 'https://macone.vn/wp-content/uploads/2020/11/macbook-air-gold-m1-2020.jpeg');

create table bills(
id int primary key not null,
email varchar(255),
phone varchar(255),
address varchar(255),
name varchar(255)
)