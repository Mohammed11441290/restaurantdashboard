var table = $('#example2').DataTable({
    "paging": true,
    "info": false,
    "search":false,
    "pagingType": "simple",
    "pageLength": 5,
    "lengthChange": false,
    "language": {
        "paginate": {
            "previous": "<i class='fa fa-arrow-circle-right'></i>",
            "next": "<i class='fa fa-arrow-circle-left'></i>"
        }
    }
});
// Custom search input
$('#customSearchBox').on('keyup', function() {
    table.search(this.value).draw();
});

function updatePagination() {
    var pageInfo = table.page.info();
    var totalPages = pageInfo.pages;
    var currentPage = pageInfo.page + 1;
    var paginationHTML = '';

    // Show the first few pages
    for (var i = 1; i <= Math.min(3, totalPages); i++) {
        paginationHTML += '<li class="' + (i === currentPage ? 'active' : '') + '"><a class="theme-color page" href="#" data-page="' + i + '">' + i + '</a></li>';
    }

    // Show ellipsis if there are more than 6 pages
    if (totalPages > 6 && currentPage <= 3) {
        paginationHTML += '<li><a class="theme-color" href="#">...</a></li>';
        paginationHTML += '<li class="' + (totalPages === currentPage ? 'active' : '') + '"><a class="theme-color page" href="#" data-page="' + totalPages + '">' + totalPages + '</a></li>';
    } else if (totalPages > 6 && currentPage > 3 && currentPage <= totalPages - 3) {
        paginationHTML += '<li><a class="theme-color" href="#">...</a></li>';
        for (var i = currentPage - 1; i <= Math.min(currentPage + 1, totalPages); i++) {
            paginationHTML += '<li class="' + (i === currentPage ? 'active' : '') + '"><a class="theme-color page" href="#" data-page="' + i + '">' + i + '</a></li>';
        }
        paginationHTML += '<li><a class="theme-color" href="#">...</a></li>';
        paginationHTML += '<li class="' + (totalPages === currentPage ? 'active' : '') + '"><a class="theme-color page" href="#" data-page="' + totalPages + '">' + totalPages + '</a></li>';
    } else if (totalPages > 6 && currentPage > totalPages - 3) {
        paginationHTML += '<li><a class="theme-color" href="#">...</a></li>';
        for (var i = totalPages - 2; i <= totalPages; i++) {
            paginationHTML += '<li class="' + (i === currentPage ? 'active' : '') + '"><a class="theme-color page" href="#" data-page="' + i + '">' + i + '</a></li>';
        }
    } else if (totalPages <= 6) {
        for (var i = 4; i <= totalPages; i++) {
            paginationHTML += '<li class="' + (i === currentPage ? 'active' : '') + '"><a class="theme-color page" href="#" data-page="' + i + '">' + i + '</a></li>';
        }
    }

    $('.page-numbers').html(paginationHTML);

    $('.page').click(function(e) {
        e.preventDefault();
        var page = $(this).data('page') - 1;
        table.page(page).draw('page');
    });
}

function updatePageInfo() {
    var pageInfo = table.page.info();
    var pageInfoText = `اظهار ${pageInfo.start + 1} الي ${pageInfo.end} من اصل ${pageInfo.recordsTotal} مدخل`;
    $('#pageInfoText').text(pageInfoText);
}

$('.prev').click(function(e) {
    e.preventDefault();
    table.page('previous').draw('page');
});

$('.next').click(function(e) {
    e.preventDefault();
    table.page('next').draw('page');
});

$('#itemsPerPage').change(function() {
    var length = $(this).val();
    table.page.len(length).draw();
});

table.on('draw', function() {
    updatePageInfo();
    updatePagination();
});

updatePageInfo();
updatePagination(); 