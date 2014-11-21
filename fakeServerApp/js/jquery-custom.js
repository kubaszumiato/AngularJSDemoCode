$(document).ready(function () {

    var num = $('#myTable tr').length - 2;
    $('#modelOrders').text(num);
    $('#totalOrders').text(num+1);


    $('#addOrderBtn').click(function () {
        num = $('#myTable tr').length - 2;
        $('#myTable tr:last').after('<tr><td>' + num + '</td><td>jQuery: ' + num + '</td><td>' + num + '.' + num + '</td></tr>');
        $('#modelOrders').text(num);
        $('#totalOrders').text(num + 1);
    });

    $.ajax({
        type: "GET",
        url: "Home/Orders",
        dataType: "json",

        success: function(data) {
            var len = data.length;
            for (var i = 0; i < len; i++) {
                var id = data[i].id;
                var numerator = data[i].numerator;
                var price = data[i].price;
                $('#myTable tr:last').after('<tr><td>' + id + '</td><td>' + numerator + '</td><td>' + price + '</td></tr>');
            }
            num = $('#myTable tr').length - 2;
            $('#modelOrders').text(num);
            $('#totalOrders').text(num + 1);
        }
    });
});