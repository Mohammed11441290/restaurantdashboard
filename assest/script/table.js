$(document).ready(function () {
    /*
    * ####################################
    * # data table 1
    * ####################################
    */

    // $('#examplee').DataTable();
    // $('#example2').DataTable();
    var table = $('#example2').DataTable({
        "paging": true,
        "info": false,
        "search": false,
        "pagingType": "simple",
        "pageLength": 10,
        "lengthChange": false,
        "language": {
            "paginate": {
                "previous": "<i class='fa fa-arrow-circle-right'></i>",
                "next": "<i class='fa fa-arrow-circle-left'></i>"
            }
        }
    });
    // Custom search input
    $('#customSearchBox').on('keyup', function () {
        table.search(this.value).draw();
    });
    function updatePagination() {
        var pageInfo = table.page.info();
        var totalPages = pageInfo.pages;
        var currentPage = pageInfo.page + 1;
        var paginationHTML = '';

        // Show the first few pages
        for (var i = 1; i <= Math.min(2, totalPages); i++) {
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

        $('.page').click(function (e) {
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
    $('.prev').click(function (e) {
        e.preventDefault();
        table.page('previous').draw('page');
    });
    $('.next').click(function (e) {
        e.preventDefault();
        table.page('next').draw('page');
    });
    $('#itemsPerPage').change(function () {
        var length = $(this).val();
        table.page.len(length).draw();
    });
    table.on('draw', function () {
        updatePageInfo();
        updatePagination();
    });
    updatePageInfo();
    updatePagination();

    //     function setupDataTable(tableId) {
    //         var table = $(tableId).DataTable({
    //             "paging": true,
    //             "info": false,
    //             "search": false,
    //             "pagingType": "simple",
    //             "pageLength": 10,
    //             "lengthChange": false,
    //             "language": {
    //                 "paginate": {
    //                     "previous": "<i class='fa fa-arrow-circle-right'></i>",
    //                     "next": "<i class='fa fa-arrow-circle-left'></i>"
    //                 }
    //             }
    //         });

    //         // Custom search input
    //         $(customSearchBoxId).on('keyup', function() {
    //             table.search(this.value).draw();
    //         });

    //         function updatePagination() {
    //             var pageInfo = table.page.info();
    //             var totalPages = pageInfo.pages;
    //             var currentPage = pageInfo.page + 1;
    //             var paginationHTML = '';

    //             // Show the first few pages
    //             for (var i = 1; i <= Math.min(3, totalPages); i++) {
    //                 paginationHTML += '<li class="' + (i === currentPage ? 'active' : '') + '"><a class="theme-color page" href="#" data-page="' + i + '">' + i + '</a></li>';
    //             }

    //             // Show ellipsis if there are more than 6 pages
    //             if (totalPages > 6 && currentPage <= 3) {
    //                 paginationHTML += '<li><a class="theme-color" href="#">...</a></li>';
    //                 paginationHTML += '<li class="' + (totalPages === currentPage ? 'active' : '') + '"><a class="theme-color page" href="#" data-page="' + totalPages + '">' + totalPages + '</a></li>';
    //             } else if (totalPages > 6 && currentPage > 3 && currentPage <= totalPages - 3) {
    //                 paginationHTML += '<li><a class="theme-color" href="#">...</a></li>';
    //                 for (var i = currentPage - 1; i <= Math.min(currentPage + 1, totalPages); i++) {
    //                     paginationHTML += '<li class="' + (i === currentPage ? 'active' : '') + '"><a class="theme-color page" href="#" data-page="' + i + '">' + i + '</a></li>';
    //                 }
    //                 paginationHTML += '<li><a class="theme-color" href="#">...</a></li>';
    //                 paginationHTML += '<li class="' + (totalPages === currentPage ? 'active' : '') + '"><a class="theme-color page" href="#" data-page="' + totalPages + '">' + totalPages + '</a></li>';
    //             } else if (totalPages > 6 && currentPage > totalPages - 3) {
    //                 paginationHTML += '<li><a class="theme-color" href="#">...</a></li>';
    //                 for (var i = totalPages - 2; i <= totalPages; i++) {
    //                     paginationHTML += '<li class="' + (i === currentPage ? 'active' : '') + '"><a class="theme-color page" href="#" data-page="' + i + '">' + i + '</a></li>';
    //                 }
    //             } else if (totalPages <= 6) {
    //                 for (var i = 4; i <= totalPages; i++) {
    //                     paginationHTML += '<li class="' + (i === currentPage ? 'active' : '') + '"><a class="theme-color page" href="#" data-page="' + i + '">' + i + '</a></li>';
    //                 }
    //             }

    //             $(paginationId).html(paginationHTML);

    //             $('.page').click(function(e) {
    //                 e.preventDefault();
    //                 var page = $(this).data('page') - 1;
    //                 table.page(page).draw('page');
    //             });
    //         }

    //         function updatePageInfo() {
    //             var pageInfo = table.page.info();
    //             var pageInfoText = `اظهار ${pageInfo.start + 1} الي ${pageInfo.end} من اصل ${pageInfo.recordsTotal} مدخل`;
    //             $(pageInfoTextId).text(pageInfoText);
    //         }

    //         $(prevBtnClass).click(function(e) {
    //             e.preventDefault();
    //             table.page('previous').draw('page');
    //         });

    //         $(nextBtnClass).click(function(e) {
    //             e.preventDefault();
    //             table.page('next').draw('page');
    //         });

    //         $(itemsPerPageId).change(function() {
    //             var length = $(this).val();
    //             table.page.len(length).draw();
    //         });

    //         table.on('draw', function() {
    //             updatePageInfo();
    //             updatePagination();
    //         });

    //         updatePageInfo();
    //         updatePagination();

    //     }

    //   // Initialize DataTables with different IDs

    //             setupDataTable('#example2', '#customSearchBox', '.pagination', '#pageInfoText', '.prev', '.next', '#itemsPerPage');
    //             setupDataTable('#datatable1', '#datatableserach1', '.anotherPagination', '#anotherPageInfoText', '.anotherPrev', '.anotherNext', '#anotherItemsPerPage');
    //             // Add more tables as needed


    // function setupDataTable(tableId) {
    //     var table = $(tableId).DataTable({
    //         "paging": true,
    //         "info": false,
    //         "search": false,
    //         "pagingType": "simple",
    //         "pageLength": 10,
    //         "lengthChange": false,
    //         "language": {
    //             "paginate": {
    //                 "previous": "<i class='fa fa-arrow-circle-right'></i>",
    //                 "next": "<i class='fa fa-arrow-circle-left'></i>"
    //             }
    //         }
    //     });

    //     // Custom search input
    //     $(`${tableId}_customSearchBox`).on('keyup', function() {
    //         table.search(this.value).draw();
    //     });

    //     function updatePagination() {
    //         var pageInfo = table.page.info();
    //         var totalPages = pageInfo.pages;
    //         var currentPage = pageInfo.page + 1;
    //         var paginationHTML = '';

    //         // Show the first few pages
    //         for (var i = 1; i <= Math.min(3, totalPages); i++) {
    //             paginationHTML += '<li class="' + (i === currentPage ? 'active' : '') + '"><a class="theme-color page" href="#" data-page="' + i + '">' + i + '</a></li>';
    //         }

    //         // Show ellipsis if there are more than 6 pages
    //         if (totalPages > 6 && currentPage <= 3) {
    //             paginationHTML += '<li><a class="theme-color" href="#">...</a></li>';
    //             paginationHTML += '<li class="' + (totalPages === currentPage ? 'active' : '') + '"><a class="theme-color page" href="#" data-page="' + totalPages + '">' + totalPages + '</a></li>';
    //         } else if (totalPages > 6 && currentPage > 3 && currentPage <= totalPages - 3) {
    //             paginationHTML += '<li><a class="theme-color" href="#">...</a></li>';
    //             for (var i = currentPage - 1; i <= Math.min(currentPage + 1, totalPages); i++) {
    //                 paginationHTML += '<li class="' + (i === currentPage ? 'active' : '') + '"><a class="theme-color page" href="#" data-page="' + i + '">' + i + '</a></li>';
    //             }
    //             paginationHTML += '<li><a class="theme-color" href="#">...</a></li>';
    //             paginationHTML += '<li class="' + (totalPages === currentPage ? 'active' : '') + '"><a class="theme-color page" href="#" data-page="' + totalPages + '">' + totalPages + '</a></li>';
    //         } else if (totalPages > 6 && currentPage > totalPages - 3) {
    //             paginationHTML += '<li><a class="theme-color" href="#">...</a></li>';
    //             for (var i = totalPages - 2; i <= totalPages; i++) {
    //                 paginationHTML += '<li class="' + (i === currentPage ? 'active' : '') + '"><a class="theme-color page" href="#" data-page="' + i + '">' + i + '</a></li>';
    //             }
    //         } else if (totalPages <= 6) {
    //             for (var i = 4; i <= totalPages; i++) {
    //                 paginationHTML += '<li class="' + (i === currentPage ? 'active' : '') + '"><a class="theme-color page" href="#" data-page="' + i + '">' + i + '</a></li>';
    //             }
    //         }

    //         $(`${tableId}_page-numbers`).html(paginationHTML);

    //         $('.page').click(function(e) {
    //             e.preventDefault();
    //             var page = $(this).data('page') - 1;
    //             table.page(page).draw('page');
    //         });
    //     }

    //     function updatePageInfo() {
    //         var pageInfo = table.page.info();
    //         var pageInfoText = `اظهار ${pageInfo.start + 1} الي ${pageInfo.end} من اصل ${pageInfo.recordsTotal} مدخل`;
    //         $(`${tableId}_pageInfoText`).text(pageInfoText);
    //     }

    //     $(`${tableId}_prev`).click(function(e) {
    //         e.preventDefault();
    //         table.page('previous').draw('page');
    //     });

    //     $(`${tableId}_next`).click(function(e) {
    //         e.preventDefault();
    //         table.page('next').draw('page');
    //     });

    //     $(`${tableId}_itemsPerPage`).change(function() {
    //         var length = $(this).val();
    //         table.page.len(length).draw();
    //     });

    //     table.on('draw', function() {
    //         updatePageInfo();
    //         updatePagination();
    //     });

    //     updatePageInfo();
    //     updatePagination();
    // }

    // // Initialize DataTables with different IDs

    //     setupDataTable('#example2');
    //     setupDataTable('#datatable1');
});

// Add more tables as needed
$(document).ready(function () {
    var table = $('#datatable-1').DataTable({
        "paging": true,
        "info": false,
        "search": false,
        "pagingType": "simple",
        "pageLength": 10,
        "lengthChange": false,
        "language": {
            "paginate": {
                "previous": "<i class='fa fa-arrow-circle-right'></i>",
                "next": "<i class='fa fa-arrow-circle-left'></i>"
            }
        }
    });
    // Custom search input
    $('#customSearchBox').on('keyup', function () {
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

        $('.page').click(function (e) {
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
    $('.prev').click(function (e) {
        e.preventDefault();
        table.page('previous').draw('page');
    });
    $('.next').click(function (e) {
        e.preventDefault();
        table.page('next').draw('page');
    });
    $('#itemsPerPage').change(function () {
        var length = $(this).val();
        table.page.len(length).draw();
    });
    table.on('draw', function () {
        updatePageInfo();
        updatePagination();
    });
    updatePageInfo();
    updatePagination();
});
$(document).ready(function () {
    var table = $('#datatable3').DataTable({
        "paging": true,
        "info": false,
        "search": false,
        "pagingType": "simple",
        "pageLength": 10,
        "lengthChange": false,
        "language": {
            "paginate": {
                "previous": "<i class='fa fa-arrow-circle-right'></i>",
                "next": "<i class='fa fa-arrow-circle-left'></i>"
            }
        }
    });
    // Custom search input
    $('#customSearchBox').on('keyup', function () {
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

        $('.page').click(function (e) {
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
    $('.prev').click(function (e) {
        e.preventDefault();
        table.page('previous').draw('page');
    });
    $('.next').click(function (e) {
        e.preventDefault();
        table.page('next').draw('page');
    });
    $('#itemsPerPage').change(function () {
        var length = $(this).val();
        table.page.len(length).draw();
    });
    table.on('draw', function () {
        updatePageInfo();
        updatePagination();
    });
    updatePageInfo();
    updatePagination();
});
$(document).ready(function () {
    var table = $('#datatable4').DataTable({
        "paging": true,
        "info": false,
        "search": false,
        "pagingType": "simple",
        "pageLength": 10,
        "lengthChange": false,
        "language": {
            "paginate": {
                "previous": "<i class='fa fa-arrow-circle-right'></i>",
                "next": "<i class='fa fa-arrow-circle-left'></i>"
            }
        }
    });
    // Custom search input
    $('#customSearchBox').on('keyup', function () {
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

        $('.page').click(function (e) {
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
    $('.prev').click(function (e) {
        e.preventDefault();
        table.page('previous').draw('page');
    });
    $('.next').click(function (e) {
        e.preventDefault();
        table.page('next').draw('page');
    });
    $('#itemsPerPage').change(function () {
        var length = $(this).val();
        table.page.len(length).draw();
    });
    table.on('draw', function () {
        updatePageInfo();
        updatePagination();
    });
    updatePageInfo();
    updatePagination();
});
$(document).ready(function () {
    var table = $('#datatable5').DataTable({
        "paging": true,
        "info": false,
        "search": false,
        "pagingType": "simple",
        "pageLength": 10,
        "lengthChange": false,
        "language": {
            "paginate": {
                "previous": "<i class='fa fa-arrow-circle-right'></i>",
                "next": "<i class='fa fa-arrow-circle-left'></i>"
            }
        }
    });
    // Custom search input
    $('#customSearchBox').on('keyup', function () {
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

        $('.page').click(function (e) {
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
    $('.prev').click(function (e) {
        e.preventDefault();
        table.page('previous').draw('page');
    });
    $('.next').click(function (e) {
        e.preventDefault();
        table.page('next').draw('page');
    });
    $('#itemsPerPage').change(function () {
        var length = $(this).val();
        table.page.len(length).draw();
    });
    table.on('draw', function () {
        updatePageInfo();
        updatePagination();
    });
    updatePageInfo();
    updatePagination();
});
$(document).ready(function () {
    var table = $('#datatable6').DataTable({
        "paging": true,
        "info": false,
        "search": false,
        "pagingType": "simple",
        "pageLength": 10,
        "lengthChange": false,
        "language": {
            "paginate": {
                "previous": "<i class='fa fa-arrow-circle-right'></i>",
                "next": "<i class='fa fa-arrow-circle-left'></i>"
            }
        }
    });
    // Custom search input
    $('#customSearchBox').on('keyup', function () {
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

        $('.page').click(function (e) {
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
    $('.prev').click(function (e) {
        e.preventDefault();
        table.page('previous').draw('page');
    });
    $('.next').click(function (e) {
        e.preventDefault();
        table.page('next').draw('page');
    });
    $('#itemsPerPage').change(function () {
        var length = $(this).val();
        table.page.len(length).draw();
    });
    table.on('draw', function () {
        updatePageInfo();
        updatePagination();
    });
    updatePageInfo();
    updatePagination();
});

$(document).ready(function () {
    var table = $('#datatable7').DataTable({
        "paging": true,
        "info": false,
        "search": false,
        "pagingType": "simple",
        "pageLength": 10,
        "lengthChange": false,
        "language": {
            "paginate": {
                "previous": "<i class='fa fa-arrow-circle-right'></i>",
                "next": "<i class='fa fa-arrow-circle-left'></i>"
            }
        }
    });
    // Custom search input
    $('#customSearchBox').on('keyup', function () {
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

        $('.page').click(function (e) {
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
    $('.prev').click(function (e) {
        e.preventDefault();
        table.page('previous').draw('page');
    });
    $('.next').click(function (e) {
        e.preventDefault();
        table.page('next').draw('page');
    });
    $('#itemsPerPage').change(function () {
        var length = $(this).val();
        table.page.len(length).draw();
    });
    table.on('draw', function () {
        updatePageInfo();
        updatePagination();
    });
    updatePageInfo();
    updatePagination();
});
$(document).ready(function () {
    var table = $('#datatable8').DataTable({
        "paging": true,
        "info": false,
        "search": false,
        "pagingType": "simple",
        "pageLength": 10,
        "lengthChange": false,
        "language": {
            "paginate": {
                "previous": "<i class='fa fa-arrow-circle-right'></i>",
                "next": "<i class='fa fa-arrow-circle-left'></i>"
            }
        }
    });
    // Custom search input
    $('#customSearchBox').on('keyup', function () {
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

        $('.page').click(function (e) {
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
    $('.prev').click(function (e) {
        e.preventDefault();
        table.page('previous').draw('page');
    });
    $('.next').click(function (e) {
        e.preventDefault();
        table.page('next').draw('page');
    });
    $('#itemsPerPage').change(function () {
        var length = $(this).val();
        table.page.len(length).draw();
    });
    table.on('draw', function () {
        updatePageInfo();
        updatePagination();
    });
    updatePageInfo();
    updatePagination();
});
$(document).ready(function () {
    var table = $('#datatable9').DataTable({
        "paging": true,
        "info": false,
        "search": false,
        "pagingType": "simple",
        "pageLength": 10,
        "lengthChange": false,
        "language": {
            "paginate": {
                "previous": "<i class='fa fa-arrow-circle-right'></i>",
                "next": "<i class='fa fa-arrow-circle-left'></i>"
            }
        }
    });
    // Custom search input
    $('#customSearchBox').on('keyup', function () {
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

        $('.page').click(function (e) {
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
    $('.prev').click(function (e) {
        e.preventDefault();
        table.page('previous').draw('page');
    });
    $('.next').click(function (e) {
        e.preventDefault();
        table.page('next').draw('page');
    });
    $('#itemsPerPage').change(function () {
        var length = $(this).val();
        table.page.len(length).draw();
    });
    table.on('draw', function () {
        updatePageInfo();
        updatePagination();
    });
    updatePageInfo();
    updatePagination();
});
$(document).ready(function () {
    var table = $('#datatable10').DataTable({
        "paging": true,
        "info": false,
        "search": false,
        "pagingType": "simple",
        "pageLength": 10,
        "lengthChange": false,
        "language": {
            "paginate": {
                "previous": "<i class='fa fa-arrow-circle-right'></i>",
                "next": "<i class='fa fa-arrow-circle-left'></i>"
            }
        }
    });
    // Custom search input
    $('#customSearchBox').on('keyup', function () {
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

        $('.page').click(function (e) {
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
    $('.prev').click(function (e) {
        e.preventDefault();
        table.page('previous').draw('page');
    });
    $('.next').click(function (e) {
        e.preventDefault();
        table.page('next').draw('page');
    });
    $('#itemsPerPage').change(function () {
        var length = $(this).val();
        table.page.len(length).draw();
    });
    table.on('draw', function () {
        updatePageInfo();
        updatePagination();
    });
    updatePageInfo();
    updatePagination();
});
$(document).ready(function () {
    var table = $('#datatable11').DataTable({
        "paging": true,
        "info": false,
        "search": false,
        "pagingType": "simple",
        "pageLength": 10,
        "lengthChange": false,
        "language": {
            "paginate": {
                "previous": "<i class='fa fa-arrow-circle-right'></i>",
                "next": "<i class='fa fa-arrow-circle-left'></i>"
            }
        }
    });
    // Custom search input
    $('#customSearchBox').on('keyup', function () {
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

        $('.page').click(function (e) {
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
    $('.prev').click(function (e) {
        e.preventDefault();
        table.page('previous').draw('page');
    });
    $('.next').click(function (e) {
        e.preventDefault();
        table.page('next').draw('page');
    });
    $('#itemsPerPage').change(function () {
        var length = $(this).val();
        table.page.len(length).draw();
    });
    table.on('draw', function () {
        updatePageInfo();
        updatePagination();
    });
    updatePageInfo();
    updatePagination();
});
$(document).ready(function () {
    var table = $('#datatable12').DataTable({
        "paging": true,
        "info": false,
        "search": false,
        "pagingType": "simple",
        "pageLength": 10,
        "lengthChange": false,
        "language": {
            "paginate": {
                "previous": "<i class='fa fa-arrow-circle-right'></i>",
                "next": "<i class='fa fa-arrow-circle-left'></i>"
            }
        }
    });
    // Custom search input
    $('#customSearchBox').on('keyup', function () {
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

        $('.page').click(function (e) {
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
    $('.prev').click(function (e) {
        e.preventDefault();
        table.page('previous').draw('page');
    });
    $('.next').click(function (e) {
        e.preventDefault();
        table.page('next').draw('page');
    });
    $('#itemsPerPage').change(function () {
        var length = $(this).val();
        table.page.len(length).draw();
    });
    table.on('draw', function () {
        updatePageInfo();
        updatePagination();
    });
    updatePageInfo();
    updatePagination();
});
$(document).ready(function () {
    var table = $('#datatable13').DataTable({
        "paging": true,
        "info": false,
        "search": false,
        "pagingType": "simple",
        "pageLength": 10,
        "lengthChange": false,
        "language": {
            "paginate": {
                "previous": "<i class='fa fa-arrow-circle-right'></i>",
                "next": "<i class='fa fa-arrow-circle-left'></i>"
            }
        }
    });
    // Custom search input
    $('#customSearchBox').on('keyup', function () {
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

        $('.page').click(function (e) {
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
    $('.prev').click(function (e) {
        e.preventDefault();
        table.page('previous').draw('page');
    });
    $('.next').click(function (e) {
        e.preventDefault();
        table.page('next').draw('page');
    });
    $('#itemsPerPage').change(function () {
        var length = $(this).val();
        table.page.len(length).draw();
    });
    table.on('draw', function () {
        updatePageInfo();
        updatePagination();
    });
    updatePageInfo();
    updatePagination();
});
$(document).ready(function () {
    var table = $('#datatable14').DataTable({
        "paging": true,
        "info": false,
        "search": false,
        "pagingType": "simple",
        "pageLength": 10,
        "lengthChange": false,
        "language": {
            "paginate": {
                "previous": "<i class='fa fa-arrow-circle-right'></i>",
                "next": "<i class='fa fa-arrow-circle-left'></i>"
            }
        }
    });
    // Custom search input
    $('#customSearchBox').on('keyup', function () {
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

        $('.page').click(function (e) {
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
    $('.prev').click(function (e) {
        e.preventDefault();
        table.page('previous').draw('page');
    });
    $('.next').click(function (e) {
        e.preventDefault();
        table.page('next').draw('page');
    });
    $('#itemsPerPage').change(function () {
        var length = $(this).val();
        table.page.len(length).draw();
    });
    table.on('draw', function () {
        updatePageInfo();
        updatePagination();
    });
    updatePageInfo();
    updatePagination();
});
$(document).ready(function () {
    var table = $('#datatable15').DataTable({
        "paging": true,
        "info": false,
        "search": false,
        "pagingType": "simple",
        "pageLength": 10,
        "lengthChange": false,
        "language": {
            "paginate": {
                "previous": "<i class='fa fa-arrow-circle-right'></i>",
                "next": "<i class='fa fa-arrow-circle-left'></i>"
            }
        }
    });
    // Custom search input
    $('#customSearchBox').on('keyup', function () {
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

        $('.page').click(function (e) {
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
    $('.prev').click(function (e) {
        e.preventDefault();
        table.page('previous').draw('page');
    });
    $('.next').click(function (e) {
        e.preventDefault();
        table.page('next').draw('page');
    });
    $('#itemsPerPage').change(function () {
        var length = $(this).val();
        table.page.len(length).draw();
    });
    table.on('draw', function () {
        updatePageInfo();
        updatePagination();
    });
    updatePageInfo();
    updatePagination();
});
$(document).ready(function () {
    var table = $('#datatable16').DataTable({
        "paging": true,
        "info": false,
        "search": false,
        "pagingType": "simple",
        "pageLength": 10,
        "lengthChange": false,
        "language": {
            "paginate": {
                "previous": "<i class='fa fa-arrow-circle-right'></i>",
                "next": "<i class='fa fa-arrow-circle-left'></i>"
            }
        }
    });
    // Custom search input
    $('#customSearchBox').on('keyup', function () {
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

        $('.page').click(function (e) {
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
    $('.prev').click(function (e) {
        e.preventDefault();
        table.page('previous').draw('page');
    });
    $('.next').click(function (e) {
        e.preventDefault();
        table.page('next').draw('page');
    });
    $('#itemsPerPage').change(function () {
        var length = $(this).val();
        table.page.len(length).draw();
    });
    table.on('draw', function () {
        updatePageInfo();
        updatePagination();
    });
    updatePageInfo();
    updatePagination();
});