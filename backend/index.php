<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

include 'DbConnect.php';
$objDb = new DbConnect;
$conn = $objDb->connect();

$method = $_SERVER['REQUEST_METHOD'];
switch($method) {
    case "GET":
        $sql = "SELECT * FROM tenants";
        $path = explode('/', $_SERVER['REQUEST_URI']);
        if(isset($path[3]) && is_numeric($path[3])) {
            $sql .= " WHERE id = :id";
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':id', $path[3]);
            $stmt->execute();
            $tenants = $stmt->fetch(PDO::FETCH_ASSOC);
        } else {
            $stmt = $conn->prepare($sql);
            $stmt->execute();
            $tenants = $stmt->fetchAll(PDO::FETCH_ASSOC);
        }

        echo json_encode($tenants);
        break;
    case "POST":
        $tenant = json_decode( file_get_contents('php://input') );
        $sql = "INSERT INTO tenants(id, name, email, phone, dob) VALUES(null, :name, :email, :phone, :dob)";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':name', $tenant->name);
        $stmt->bindParam(':email', $tenant->email);
        $stmt->bindParam(':phone', $tenant->phone);
        $stmt->bindParam(':dob', $tenant->dob);

        if($stmt->execute()) {
            $response = ['status' => 1, 'message' => 'Record created successfully.'];
        } else {
            $response = ['status' => 0, 'message' => 'Failed to create record.'];
        }
        echo json_encode($response);
        break;

    case "PUT":
        $tenant = json_decode( file_get_contents('php://input') );
        $sql = "UPDATE tenants SET name= :name, email =:email, phone =:phone, dob =:dob WHERE id = :id";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':id', $tenant->id);
        $stmt->bindParam(':name', $tenant->name);
        $stmt->bindParam(':email', $tenant->email);
        $stmt->bindParam(':phone', $tenant->phone);
        $stmt->bindParam(':dob', $tenant->dob);

        if($stmt->execute()) {
            $response = ['status' => 1, 'message' => 'Record updated successfully.'];
        } else {
            $response = ['status' => 0, 'message' => 'Failed to update record.'];
        }
        echo json_encode($response);
        break;

    case "DELETE":
        $sql = "DELETE FROM tenants WHERE id = :id";
        $path = explode('/', $_SERVER['REQUEST_URI']);

        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':id', $path[3]);

        if($stmt->execute()) {
            $response = ['status' => 1, 'message' => 'Record deleted successfully.'];
        } else {
            $response = ['status' => 0, 'message' => 'Failed to delete record.'];
        }
        echo json_encode($response);
        break;
}