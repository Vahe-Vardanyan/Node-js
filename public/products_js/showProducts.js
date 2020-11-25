$('input[name=imgUploader]').on('change', function() {

    const size = (this.files[0].size / 1024 / 1024).toFixed(2);

    $("input[name=fsize]")[0].value = size;

});


var imgname = "";
$(".d2").click(function(e) {
    let fid = $(this).attr("data-pic_id")
    $("#formtest").attr("action", `/change?id=${fid}`);

    $("#changename").val($(this).attr("data-picid"));
    $("#changeid").val($(this).attr("data-pic_id"));
});


$("#files").click(function() {
    document.getElementById("blah").style.visibility = "visible";
});

function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function(e) {
            $('#blah').attr('src', e.target.result);
        }

        reader.readAsDataURL(input.files[0]); // convert to base64 string
    }
}
$("#files").change(function() {
    readURL(this);
});