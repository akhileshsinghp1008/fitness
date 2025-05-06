<?php
include 'db.php';

$email = $_POST['email'];
$password = $_POST['password'];

$stmt = $conn->prepare("SELECT * FROM users WHERE email = ?");
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 1) {
    $user = $result->fetch_assoc();

    if (password_verify($password, $user['password'])) {
        // Successful login
        session_start();
        $_SESSION['user_id'] = $user['id'];
        header("Location: fit.html");
        exit();
    } else {
        echo "<script>alert('Wrong password!'); window.location.href='/fitness-site/login.html';</script>";
    }
} else {
    echo "<script>alert('Email not registered!'); window.location.href='/fitness-site/login.html';</script>";
}
?>