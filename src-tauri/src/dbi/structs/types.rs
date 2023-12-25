


use diesel::prelude::*;

use crate::schema;

#[derive(Insertable)]
#[diesel(table_name = schema::type_)]
pub struct InsertType<'a> {
    pub name: &'a str,
    pub color: &'a str,
}

#[derive(serde::Serialize)]
#[derive(Queryable, Selectable)]
#[diesel(table_name = schema::type_)]
#[diesel(check_for_backend(diesel::sqlite::Sqlite))]
pub struct Type {
    pub id: i32,
    pub name: String,
    pub color: String,
}