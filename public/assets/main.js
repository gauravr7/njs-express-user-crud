$(document).ready(function() {
   
    $('.app-delete-btn').on('click', function(e){
        const id = $(e.target).data('id');
        
        $.ajax({
            url: '/admin/delete/'+id,
            type: 'DELETE',
            success: function(result) {
                alert('Deleting employee');
                window.location.href='/admin/viewall';
            },
            error: function(result) {
                alert('error');
            }

        });
    })
    
    $('.search-user').on('click', function(e){
        const name = $('.search-name').val();
        
        $.ajax({
            url: '/admin/search/'+ name,
            type: 'GET',
            success: function(result) {
                $('.search-result').html(result);
            },
            error: function(result) {
                alert('error');
            }

        });
    })

});