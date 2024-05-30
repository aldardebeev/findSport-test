<?php
$mysqli = new mysqli("db", "find_sport_user", "find_sport_password", "find_sport");

if ($mysqli->connect_error) {
    die("Connection failed: " . $mysqli->connect_error);
}
// Найти дублирующиеся занятия
$sql = "
    SELECT 
        MIN(id) as original_id,
        GROUP_CONCAT(id) as duplicate_ids,
        start_time,
        session_configuration_id
    FROM 
        sessions
    GROUP BY
        start_time, session_configuration_id
    HAVING COUNT(*) > 1
    ";

$result = $mysqli->query($sql);

while ($row = $result->fetch_assoc()) {

    $original_id = $row['original_id'];
    $duplicate_ids = $row['duplicate_ids'];

    // Переместить записи о посещениях на оригинальные занятия
    $update_sql = "UPDATE session_members
                   SET session_id = $original_id
                   WHERE session_id IN ($duplicate_ids)";
    $mysqli->query($update_sql);

    // Удалить дублирующиеся занятия
    $delete_sql = "DELETE FROM sessions
                   WHERE id IN ($duplicate_ids) AND id != $original_id";

    $mysqli->query($delete_sql);
}

$mysqli->close();
?>
