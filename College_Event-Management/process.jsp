<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Form Validation</title>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
</head>
<body>

    <script>
        $(document).ready(function () {
            $("#validation-form").submit(function (event) {
                event.preventDefault(); // Prevent form submission

                // Perform form validation
                var name = $("#name").val();
                var email = $("#email").val();
                var phone = $("#phone").val();
                var zip = $("#zip").val();

                if (!name || !email || !phone || !zip) {
                    $("#result").html("All fields are mandatory.");
                } else {
                    // Perform AJAX request (you can replace this with your server-side code)
                    $.ajax({
                        type: "POST",
                        url: "process.php", // Replace with your server-side script
                        data: {
                            name: name,
                            email: email,
                            phone: phone,
                            zip: zip
                        },
                        success: function (response) {
                            $("#result").html(response);
                        }
                    });
                }
            });
        });
    </script>
</body>
</html>
