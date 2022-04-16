const pool = require('./conexion')


const nuevoCurso = async (nombre, nivelTecnico, fechaInicio, duracion) =>{
    try {
        const result = await pool.query(
            `INSERT INTO cursos (nombre, nivel, fecha, duracion) VALUES('${nombre}', ${nivelTecnico}, '${fechaInicio}', ${duracion})`
        );
        return result.rows
    } catch (err) {
        console.log(err.code);
        return err;
    }

}


const getCursos = async () =>{
    try {
        const result = await pool.query(
            `SELECT * FROM cursos`
        )
        return result.rows
    } catch (err) {
        console.log(err.code);
        return err;
    }
}

const editCurso = async (id, nombre, nivelTecnico, fechaInicio, duracion) =>{
try {
    const result = await pool.query(
        `UPDATE cursos SET
        nombre = '${nombre}',
        nivel = ${nivelTecnico},
        fecha = '${fechaInicio}',
        duracion = ${duracion}
        WHERE id = ${id} RETURNING*`
    )
    return result.rows
} catch (err) {
    console.log(err.code);
    return err;
}
}


const deleteCurso = async (id) =>{
    try {
        const result = await pool.query(
            `DELETE FROM cursos WHERE id= ${id}`
        )
        return result.rowCount
    } catch (err) {
        console.log(err.code);
    return err;
    }
}



module.exports = { nuevoCurso, getCursos, editCurso, deleteCurso }