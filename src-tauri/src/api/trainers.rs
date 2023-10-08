use diesel::prelude::*;

use diesel::QueryResult;

use crate::dbi::structs::trainer::Trainer;
use crate::{
    dbi::{self},
    error::PkmnResult,
    schema,
};

#[tauri::command]
pub fn read_trainers(name: Option<&str>, class: Option<&str>) -> PkmnResult<Vec<Trainer>> {
    let trainer_classes = dbi::connection::connect().transaction(|connection| {
        let mut query = schema::Trainer::table.into_boxed();
        if let Some(name) = name {
            query = query.filter(schema::Trainer::name.eq(name));
        }
        if let Some(class) = class {
            query = query.filter(schema::Trainer::class.eq(class));
        }
        let results = query.load::<Trainer>(connection)?;
        QueryResult::<Vec<Trainer>>::Ok(results)
    })?;
    Ok(trainer_classes)
}