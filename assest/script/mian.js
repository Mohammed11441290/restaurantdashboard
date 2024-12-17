

$(document).ready(function () {
  $(".dropdown-toggle").click(function (event) {
    event.preventDefault(); // Prevent the default anchor click behavior
    $(this).next(".dropdown-menu1").toggle();
  });

  // Close the dropdown if the user clicks outside of it
  $(window).click(function (event) {
    if (!$(event.target).closest(".dropdown1").length) {
      $(".dropdown-menu1").hide();
    }
  });

  // mobile nav bar
  $("#mobile-icon").click(function () {
    $(".sidpar").toggleClass("expanded");
  });

  // Close the menu if the user clicks outside of it

  $(window).on("click touchstart", function (event) {
    console.log("Window click/touchstart event triggered");
    if (!$(event.target).closest("#mobile-icon, .sidpar").length) {
      $(".sidpar").removeClass("expanded");
    }
  });
});

$(document).ready(function () {
  let basePrice = 0;
  let addonsPrice = 0;
  let quantity = 1;

  // Function to update the total price
  function updateTotalPrice() {
    let totalPrice = (basePrice + addonsPrice) * quantity;
    $(".total-price").text(totalPrice.toFixed(2) + " ريال");
  }

  // Handle size selection (only one can be selected)
  $('.items-size input[type="checkbox"]').on("change", function () {
    $('.items-size input[type="checkbox"]').not(this).prop("checked", false);

    if ($(this).is(":checked")) {
      basePrice = parseFloat(
        $(this)
          .closest(".d-flex")
          .find("h3")
          .text()
          .replace(/[^\d.]/g, "")
      );
    } else {
      basePrice = 0;
    }
    updateTotalPrice();
  });

  // Handle add-ons selection (multiple can be selected)

  $('.items-adds input[type="checkbox"]').on("change", function () {
    let addonPrice = parseFloat(
      $(this)
        .closest(".d-flex")
        .find("h3")
        .text()
        .replace(/[^\d.]/g, "")
    );

    if ($(this).is(":checked")) {
      addonsPrice += addonPrice;
    } else {
      addonsPrice -= addonPrice;
    }
    updateTotalPrice();
  });

  // Handle quantity increase
  $(".counter-plus").on("click", function () {
    quantity++;
    $("#handleCounter input").val(quantity);
    updateTotalPrice();
  });

  // Handle quantity decrease
  $(".counter-minus").on("click", function () {
    if (quantity > 1) {
      quantity--;
      $("#handleCounter input").val(quantity);
      updateTotalPrice();
    }
  });
});


// new AirDatepicker('#data-one');
function exportToExcel() {
  var invoiceContent = document.getElementById("invoiceone").outerHTML;

  // Convert the HTML content to a worksheet
  var wb = XLSX.utils.book_new();
  var ws = XLSX.utils.aoa_to_sheet([
    ["مطعم برو"],
    ["موعد الطلب:", "10/2/2024 : 12:30 PM"],
    ["رقم الطلب:", "2334412"],
    ["نوع الطلب:", "داخل المطعم"],
    ["رقم الوحدة:", "320"],
    ["اسم العميل:", "2334412"],
    ["رقم الجوال:", "9099939393"],
    ["الصنف", "الكمية", "الاضافات", "السعر"],
    ["اسم الصنف", 3, "-", 4],
    ["اسم الصنف", 5, "-", 54],
    ["اسم الصنف", 3, "-", 74],
    ["المجموع:", "120ريال"],
    ["ضريبة القيمة المضافة:", "10ريال"],
    ["الاجمالى:", "220ريال"],
  ]);

  // Add the worksheet to the workbook
  XLSX.utils.book_append_sheet(wb, ws, "Invoice");

  // Export the workbook to an Excel file
  XLSX.writeFile(wb, "invoice.xlsx");
}

document.addEventListener("DOMContentLoaded", function () {
  var $on = "section";
  $($on).css({
    background: "none",
    border: "none",
    "box-shadow": "none",
  });
  flatpickr("#datepicker1", {
    enableTime: true,
    dateFormat: "Y-M-d",
  });
  flatpickr("#datepicker2", {
    enableTime: true,
    dateFormat: "Y-m-d",
  });
  flatpickr("#datepicker3", {
    enableTime: true,
    dateFormat: "Y-m-d",
  });
  flatpickr("#datepicker4", {
    enableTime: true,
    dateFormat: "Y-m-d",
  });
  flatpickr("#datepicker5", {
    enableTime: true,
    dateFormat: "Y",
  });
  flatpickr("#datepicker6", {
    enableTime: true,
    dateFormat: "M",
  });

  flatpickr("#timpickers1", {
    enableTime: true,
    noCalendar: true,
    dateFormat: "H:i K",
    time_24hr: false,
  });
  flatpickr("#timpickers2", {
    enableTime: true,
    noCalendar: true,
    dateFormat: "H:i K",
    time_24hr: false,
  });
  flatpickr("#timpickers3", {
    enableTime: true,
    noCalendar: true,
    dateFormat: "H:i K",
    time_24hr: false,
  });
  flatpickr("#timpickers4", {
    enableTime: true,
    noCalendar: true,
    dateFormat: "H:i K",
    time_24hr: false,
  });
  flatpickr("#timpickers5", {
    enableTime: true,
    noCalendar: true,
    dateFormat: "H:i K",
    time_24hr: false,
  });
});

$(document).ready(function () {
  $(".delete-icon2").click(function () {
    $("#gallery2").empty();
    $(".progress-bar2").css("width", "0%");
    $("#upload-percentage2").text("0%");
    $(".progress-bar-container2").hide();
    $(".completion-message2").hide();
    $("#file-upload2").val("");
    updateImageCount();
  });

  //

  $(".dropdown-btn").click(function () {
    // Close all dropdowns except the one being clicked
    $(".dropdown-container").not($(this).next()).slideUp();
    $(".dropdown-btn").not($(this)).removeClass("active");
    $(".dropdown-btn")
      .not($(this))
      .find(".fa-caret-down")
      .removeClass("rotate");

    // Toggle the clicked dropdown
    $(this).next(".dropdown-container").slideToggle();
    $(this).toggleClass("active");
    $(this).find(".fa-caret-down").toggleClass("rotate");
  });

  /**
   * ******************************************
   *  1_ add weekly days
   * ******************************************
   **/
  $(".add-item").click(function () {
    addItem();
  });

  $(".item-input").keypress(function (e) {
    if (e.which == 13) {
      // Enter key pressed
      addItem();
    }
  });

  $(".item-list").on("click", ".delete-item", function () {
    $(this).parent().remove();
  });

  function addItem() {
    var itemValue = $(".item-input").val().trim();
    if (itemValue) {
      var listItem = $('<li class="text-X-Small"></li>').text(itemValue);

      var deleteButton = $(
        '<span class="delete-item"><i class="fa fa-xmark-circle"></i></span>'
      );
      listItem.append(deleteButton);
      $(".item-list").append(listItem);
      $(".item-input").val("");
    }
  }

  /**
   * ******************************************
   *  1_ increc number
   * ******************************************
   **/
  $(".counter-plus").click(function () {
    var $input = $(this).siblings("input");
    var value = parseInt($input.val());
    value = isNaN(value) ? 0 : value;
    $input.val(value + 1);
  });

  $(".counter-minus").click(function () {
    var $input = $(this).siblings("input");
    var value = parseInt($input.val());
    value = isNaN(value) ? 0 : value;
    if (value > 1) {
      $input.val(value - 1);
    }
  });

  /**
   * ******************************************
   *  1_ image uplaod
   * ******************************************
   **/

  $("#file-upload").change(function (event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        $("#uploaded-image").attr("src", e.target.result).show();
        $(".delete-icon").show();
        const fileSize = (file.size / 1024).toFixed(2) + " KB";
        $("#image-size").text(fileSize);
        $(".image-info").show();
      };
      reader.readAsDataURL(file);
    }
  });

  // Simulate upload progress
  $("#file-upload").change(function () {
    $(".progress-bar-container").show();
    let progress = 0;
    const interval = setInterval(function () {
      progress += 10;
      $(".progress-bar").css("width", progress + "%");
      $("#upload-percentage").text(progress + "%");
      if (progress >= 100) {
        clearInterval(interval);
        $container.find(".pdf-img").show();
        setTimeout(function () {
          $(".completion-message").show();
        }, 500);
        $(".upload-label").hide();
      }
    }, 300);
  });

  $(".delete-icon").click(function () {
    $("#uploaded-image").hide();
    $(".delete-icon").hide();
    $(".progress-bar").css("width", "0%");
    $("#upload-percentage").text("0%");
    $(".image-info").hide();
    $(".progress-bar-container").hide();
    $(".completion-message").hide();
    $("#file-upload").val("");
  });
  /**
   * ******************************************
   *  1_ date pickers
   * ******************************************
   **/

  $(document).on("change", ".file-upload", function (event) {
    const $container = $(this).closest(".upload-container");
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        $container.find(".uploaded-image").attr("src", e.target.result).show();
        $container.find(".delete-icon").show();
        const fileSize = (file.size / 1024).toFixed(2) + " KB";
        $container.find(".image-size").text(fileSize);
        $container.find(".img-info").show();
      };
      reader.readAsDataURL(file);

      // Simulate upload progress
      $container.find(".progress-bar-container").show();
      let progress = 0;
      const interval = setInterval(function () {
        progress += 10;
        $container.find(".progress-bar").css("width", progress + "%");
        $container.find(".upload-percentage").text(progress + "%");
        if (progress >= 100) {
          clearInterval(interval);
          // Hide divs when progress is 100%
          $container.find(".pdf-img").show();
          $container.find(".upload-label").hide(); // Add the selector of the div you want to hide
          setTimeout(function () {
            $container.find(".completion-message").show();
          }, 500);
        }
      }, 300);
    }
  });

  $(document).on("click", ".delete-icon", function () {
    const $container = $(this).closest(".upload-container");
    $container.find(".uploaded-image").hide();
    $(this).hide();
    $container.find(".progress-bar").css("width", "0%");
    $container.find(".upload-percentage").text("0%");
    $container.find(".img-info").hide();
    $container.find(".progress-bar-container").hide();
    $container.find(".completion-message").hide();
    $container.find(".pdf-img").hide();
    $container.find(".upload-label").show();
    $container.find(".file-upload").val("");
  });

  /**
   * ******************************************
   *  1_ open popup model
   * ******************************************
   **/
  $(".open-modal").click(function (e) {
    e.preventDefault();
    var modalId = $(this).data("modal");
    $('.modal-overlay[data-modal="' + modalId + '"]').fadeIn();
    $('.modal-box[data-modal="' + modalId + '"]').fadeIn();
  });
  $(".open-modal-1").click(function (e) {
    e.preventDefault();
    var modalId = $(this).data("modal");
    $('.modal-overlay[data-modal="' + modalId + '"]').fadeIn();
    $('.modal-box[data-modal="' + modalId + '"]').fadeIn();
  });

  $(".modal-close, .modal-close-icon, .modal-overlay").click(function () {
    var modalId = $(this).data("modal");
    $('.modal-overlay[data-modal="' + modalId + '"]').fadeOut();
    $('.modal-box[data-modal="' + modalId + '"]').fadeOut();
  });

  /**
   * ******************************************
   *  1_ show popup window
   * ******************************************
   **/
  $(".icon-box").on("click", function (event) {
    event.preventDefault();
    var target = $(this).data("target");
    if ($(target).hasClass("show")) {
      $(target).removeClass("show").fadeOut(10);
    } else {
      $(target).addClass("show").fadeIn(10);
    }
    $(this)
      .find(".icon")
      .text(function (i, text) {
        return text === "☰" ? "✖" : "☰";
      });
  });

  $(document).on("click", function (event) {
    $(".popup-box").each(function () {
      if (
        !$(event.target).closest(this).length &&
        !$(event.target).closest(
          '.icon-box[data-target="' +
          "." +
          $(this).attr("class").split(" ")[1] +
          '"]'
        ).length
      ) {
        $(this).removeClass("show").fadeOut(10);
        $(
          '.icon-box[data-target=".' +
          $(this).attr("class").split(" ")[1] +
          '"]'
        )
          .find(".icon")
          .text("☰");
      }
    });
  });

  $(window).on("resize", function () {
    $(".popup-box").removeClass("show").fadeOut(1000);
    $(".icon").text("☰");
  });

  /**
   * #####################################
   * ## 1_ order status
   * #####################################
   **/
  function initializeToggleButton(selector) {
    $(document).on("click", selector, function () {
      var $btn = $(this);
      var toggleId = $btn.data("toggle-id");
      var onText = $btn.data("on-text");
      var offText = $btn.data("off-text");
      var $toggleText = $btn.siblings(".toggle-text");

      if ($btn.hasClass("active")) {
        $btn.removeClass("active");
        localStorage.removeItem("toggleStatus-" + toggleId);
        $toggleText.eq(0).text(offText);
        $toggleText.eq(1).text("");
      } else {
        $btn.addClass("active");
        localStorage.setItem("toggleStatus-" + toggleId, "active");
        $toggleText.eq(0).text(onText);
        $toggleText.eq(1).text("");
      }
    });

    // Initialize the state based on localStorage
    $(selector).each(function () {
      var $btn = $(this);
      var toggleId = $btn.data("toggle-id");
      var onText = $btn.data("on-text");
      var offText = $btn.data("off-text");
      var $toggleText = $btn.siblings(".toggle-text");

      if (localStorage.getItem("toggleStatus-" + toggleId) === "active") {
        $btn.addClass("active");
        $toggleText.eq(0).text(onText);
        $toggleText.eq(1).text("");
      } else {
        $toggleText.eq(0).text(offText);
        $toggleText.eq(1).text("");
      }
    });
  }

  // Call the function on document ready and after any DOM changes
  $(document).ready(function () {
    initializeToggleButton(".toggle-btn");

    // Example: Reinitialize after showing more columns
    $("#show-more-columns").click(function () {
      // Code to show more columns
      // ...

      // Reinitialize toggle buttons
      initializeToggleButton(".toggle-btn");
    });
  });

  /**
   * ******************************************
   *  1_ show color swicher
   * ******************************************
   **/
  // show color box icon
  $(".select-color").click(function () {
    const $icon = $(this).find("i");

    $(this).toggleClass("show-color-option");
    $(".color-slection").toggle(); // Toggle the visibility of the text

    if ($(this).hasClass("show-color-option")) {
      $icon.removeClass("fa-circle-half-stroke").addClass("fa-close");
    } else {
      $icon.removeClass("fa-close").addClass("fa-circle-half-stroke");
    }

    setTimeout(() => {
      $(this).removeClass("show-color-option");
      $icon.removeClass("fa-close").addClass("fa-circle-half-stroke"); // Revert to default icon
    }, 1000000000); // Match this duration to the animation duration
  });

  /**
    * ############################################
    * #### 1_ show setting option color and lang #
    * ############################################
  **/

  $(".show-option-btn").click(function () {
    const $icon = $(this).find("i");

    $(this).toggleClass("show-settings-option");
    $(".show-option-menu").toggleClass("show-settings-option"); // Toggle the visibility of the text
    $(".option-box").toggleClass("show-box-1"); // Toggle the visibility of the text

    if ($(this).hasClass("show-settings-option")) {
      $icon.removeClass("fa-circle-half-stroke").addClass("fa-close");
    } else {
      $icon.removeClass("fa-close").addClass("fa-gear");
    }

    // setTimeout(() => {
    //   $(this).removeClass("show-settings-option");
    //   $icon.removeClass("fa-close").addClass("fa-circle-half-stroke"); // Revert to default icon
    // }, 1000); // Match this duration to the animation duration


  });

  // ###########################################
  // #### Load the saved color from localStorage
  // ###########################################

  var savedColor = localStorage.getItem("backgroundColor");
  if (savedColor) {
    $(".bg-custom-color").css("background-color", savedColor);
    $(".theme-color").css("color", savedColor);
  }

  // Change the background color, save it to localStorage, and add a class to a specific div
  $(".color-btn").click(function () {
    var color = $(this).data("color");
    $(".bg-custom-color").css("background-color", color);
    $(".theme-color").css("color", color);
    localStorage.setItem("backgroundColor", color);

    // Add a class to the specific div
    $("color-slection").addClass("new-class");
  });

  /**
   *
   * ******************************************
   *  2_ fixed top bar
   * ******************************************
   *
   **/
  var $stickyDiv = $(".admin-top-bar");
  var $stickynav = $(".main-menu");

  var stickyDivTop = $stickyDiv.offset().top;
  var stickynavTop = $stickynav.offset().top;

  $(window).scroll(function () {
    if ($(window).scrollTop() > stickyDivTop) {
      $stickyDiv.css({
        position: "fixed",
        top: "0",
        width: "100%",
        "z-index": "6", // Ensures the div is above other content
      });
    } else {
      $stickyDiv.css("position", "relative");
    }
  });
  $(window).scroll(function () {
    if ($(window).scrollTop() > stickynavTop) {
      $stickynav.css({
        position: "fixed",
        top: "0",
        margin: "40",
        // 'width': '100%',
        // 'z-index': '1000' // Ensures the div is above other content
      });
    } else {
      $stickynav.css("position", "relative");
    }
  });

  // drobdown
  $(".dropdown-btn").click(function () {
    $(this).next(".dropdown-content").toggleClass("show");
    $(this).find(".dropdown-icon").toggleClass("rotate");
  });

  // Close the dropdown if the user clicks outside of it
  $(window).click(function (event) {
    if (!event.target.matches(".dropdown-btn")) {
      $(".dropdown-content").removeClass("show");
      $(".dropdown-icon").removeClass("rotate");
    }
  });
  /**
   *
   * ******************************************
   *  4_ owl carosel (slider for )
   * ******************************************
   *
   **/

  $(".number-of").owlCarousel({
    loop: true,
    autoWidth: true,
    // autoHeight: true,
    rtl: true,
    margin: 10,
    autoHeight: true, // Enable auto height
    onInitialized: setEqualHeight, // Callback after initialization
    onResized: setEqualHeight, // Callback after resizing
    responsive: {
      0: {
        items: 2,
      },
      600: {
        items: 3,
      },
      1000: {
        items: 4,
      },
    },
  });
  $(".category-slide").owlCarousel({
    loop: false,
    autoWidth: true,
    autoHeight: true,
    rtl: true,
    nav: false,
    margin: 10,
    autoHeight: true, // Enable auto height
    onInitialized: setEqualHeight, // Callback after initialization
    onResized: setEqualHeight, // Callback after resizing
    responsive: {
      0: {
        items: 2,
      },
      600: {
        items: 3,
      },
      1000: {
        items: 3,
      },
    },
  });
  function setEqualHeight() {
    var maxHeight = 0;

    // Find the maximum height
    $(".number-of .card-one").each(function () {
      var itemHeight = $(this).outerHeight();
      if (itemHeight > maxHeight) {
        maxHeight = itemHeight;
      }
    });

    // Set each item to the maximum height
    $(".number-of .card-one").each(function () {
      $(this).css("height", maxHeight + "px");
    });
    $(".category-slide .mb-2").each(function () {
      var itemHeight = $(this).outerHeight();
      if (itemHeight > maxHeight) {
        maxHeight = itemHeight;
      }
    });

    // Set each item to the maximum height
    $(".category-slide .mb-2").each(function () {
      $(this).css("height", maxHeight + "px");
    });
  }

  /**
   * ******************************************
   *  5_color switsher
   * ******************************************
   **/

  /**
   *
   * ******************************************
   *  6_ dark mode
   * ******************************************
   *
   **/
  // Check if dark mode is enabled in localStorage
  if (localStorage.getItem("darkMode") === "enabled") {
    $("body").addClass("dark-mode");
  }

  // Check the saved preference on page load
  if (localStorage.getItem("darkMode") === "enabled") {
    $("body").addClass("dark-mode");
    $("#toggle-dark-mode .fa").removeClass("fa-moon").addClass("fa-sun");
  }

  $("#toggle-dark-mode").click(function () {
    $("body").toggleClass("dark-mode");

    // Toggle the icon
    if ($("body").hasClass("dark-mode")) {
      $("#toggle-dark-mode .fa").removeClass("fa-moon").addClass("fa-sun");
      localStorage.setItem("darkMode", "enabled");
    } else {
      $("#toggle-dark-mode .fa").removeClass("fa-sun").addClass("fa-moon");
      localStorage.removeItem("darkMode");
    }
  });

  /**
   * ##########################################
   * ******************************************
   * ###     7_ setting lang suport rtl, ltr
   * ******************************************
   * ##########################################
   **/
  // Function to set the language and update UI
  function setLanguage(lang) {
    if (lang === "en") {
      $("html").attr("lang", "en");
      $("body").css({
        direction: "ltr",
        "text-align": "left",
      });
      $("#headline").text("Hello, World!");
      $("#paragraph").text(
        "This is a sample text to demonstrate language and direction change."
      );
      $("#btn-en").addClass("active");
      $("#btn-ar").removeClass("active");
      $("#btn-en-2").addClass("active");
      $("#btn-ar-2").removeClass("active");
    } else if (lang === "ar") {
      $("html").attr("lang", "ar");
      $("body").css({
        direction: "rtl",
        "text-align": "right",
      });
      $("#headline").text("مرحبا بالعالم!");
      $("#paragraph").text("هذا نص تجريبي لعرض تغيير اللغة والاتجاه.");
      $("#btn-ar").addClass("active");
      $("#btn-en").removeClass("active");
    }
    // Save the selected language in localStorage
    localStorage.setItem("preferredLanguage", lang);
  }

  // Check for saved language preference in localStorage
  const savedLanguage = localStorage.getItem("preferredLanguage") || "en";
  setLanguage(savedLanguage);

  // Event listeners for buttons
  $("#btn-en").click(function () {
    setLanguage("en");
  });
  $("#btn-ar").click(function () {
    setLanguage("ar");
  });
  $("#btn-en-2").click(function () {
    setLanguage("en");
  });
  $("#btn-ar-2").click(function () {
    setLanguage("ar");
  });

  $("#printpdf").click(function () {
    var $contentToExport = $("#invoiceone");

    // Ensure all images are fully loaded before printing
    var imagesLoaded = true;
    $contentToExport.find("img").each(function () {
      if (!this.complete) {
        imagesLoaded = false;
        $(this)
          .on("load", function () {
            if (
              $contentToExport.find("img").length ===
              $contentToExport.find("img:complete").length
            ) {
              printContent();
            }
          })
          .on("error", function () {
            console.error("Image failed to load: " + this.src);
            if (
              $contentToExport.find("img").length ===
              $contentToExport.find("img:complete").length
            ) {
              printContent();
            }
          });
      }
    });

    if (imagesLoaded) {
      printContent();
    }

    function printContent() {
      var baseURL = window.location.origin;

      $("head").append('<base href="' + baseURL + '">');

      $contentToExport.printThis({
        importCSS: true,
        importStyle: true,
        loadCSS: ["assets/css/style.css", "style2.css", "style3.css"],
        printContainer: true,
        base: baseURL,
      });

      $("base").remove();
    }
  });

  /**
   * ******************************************
   *  air date pickers
   * ******************************************
   **/
  // airdatapicker
  new AirDatepicker("#data-one", {
    dateFormat: "dd/MM/yyyy",
    clear: "حذف",
    months: [
      "يناير",
      "فبراير",
      "مارس",
      "أبريل",
      "مايو",
      "يونيو",
      "يوليو",
      "أغسطس",
      "سبتمبر",
      "اكتوبر",
      "نوفمبر",
      "ديسمبر",
    ],
    autoClose: true,
    position({ $datepicker, $target, $pointer }) {
      let coords = $target.getBoundingClientRect(),
        dpHeight = $datepicker.clientHeight,
        dpWidth = $datepicker.clientWidth;

      let top = coords.y + coords.height / 2 + window.scrollY - dpHeight / 2;
      let left = coords.x + coords.width / 2 - dpWidth / 2;

      $datepicker.style.left = `${left}px`;
      $datepicker.style.top = `${top}px`;

      $pointer.style.display = "none";
    },
  });


  //  end jquery
});
$(document).ready(function () {
  $("#languageselector").selectize({
    maxItems: null,
    valueField: "value",
    labelField: "text",
    searchField: ["text"],
    create: false,
    render: {
      option: function (item, escape) {
        return "<div>" + escape(item.text) + "</div>";
      },
      item: function (item, escape) {
        return (
          "<div>" +
          escape(item.text) +
          ' <span class="remove-item" style="cursor:pointer;"><i class="fa-thin fa-xmark-circle"></i></span></div>'
        );
      },
    },
    onItemAdd: function (value, $item) {
      // Attach click event to the "x" icon to remove the item
      $item.find(".remove-item").on("click", function (e) {
        e.preventDefault();
        e.stopPropagation(); // Prevents the default behavior and stops event bubbling
        var selectize = $("#languageselector")[0].selectize;
        selectize.removeItem(value);
      });
    },
  });
  $("#activityselector").selectize({
    maxItems: null,
    valueField: "value",
    labelField: "text",
    searchField: ["text"],
    create: false,
    render: {
      option: function (item, escape) {
        return "<div>" + escape(item.text) + "</div>";
      },
      item: function (item, escape) {
        return (
          "<div>" +
          escape(item.text) +
          ' <span class="remove-item" style="cursor:pointer;"><i class="fa-thin fa-xmark-circle"></i></span></div>'
        );
      },
    },
    onItemAdd: function (value, $item) {
      // Attach click event to the "x" icon to remove the item
      $item.find(".remove-item").on("click", function (e) {
        e.preventDefault();
        e.stopPropagation(); // Prevents the default behavior and stops event bubbling
        var selectize = $("#activityselector")[0].selectize;
        selectize.removeItem(value);
      });
    },
  });
  $("#weeklydays").selectize({
    maxItems: null,
    valueField: "value",
    labelField: "text",
    searchField: ["text"],
    create: false,
    render: {
      option: function (item, escape) {
        return "<div>" + escape(item.text) + "</div>";
      },
      item: function (item, escape) {
        return (
          "<div>" +
          escape(item.text) +
          ' <span class="remove-item" style="cursor:pointer;"><i class="fa-thin fa-xmark-circle"></i></span></div>'
        );
      },
    },
    onItemAdd: function (value, $item) {
      // Attach click event to the "x" icon to remove the item
      $item.find(".remove-item").on("click", function (e) {
        e.preventDefault();
        e.stopPropagation(); // Prevents the default behavior and stops event bubbling
        var selectize = $("#weeklydays")[0].selectize;
        selectize.removeItem(value);
      });
    },
  });
});


/**
 * ##############################################
 * ## show limte content i a table content
 * ##############################################
 **/
$(document).ready(function () {
  const limit = 2; // Set the word limit

  $(".limited-text").each(function () {
    let fullText = $(this).text();
    let words = fullText.split(" ");

    if (words.length > limit) {
      let visibleText = words.slice(0, limit).join(" ");
      let hiddenText = words.slice(limit).join(" ");

      $(this).html(
        `${visibleText} <span class="dots">...</span><span class="more-text" style="display:none;">${hiddenText}</span> <span class="show-more"> اكثر</span>`
      );

      $(this)
        .find(".show-more")
        .on("click", function () {
          $(this).siblings(".more-text, .dots").toggle();
          $(this).text($(this).text() === " اكثر" ? " اقل" : " اكثر");
        });
    }
  });
});

/**
 * ##############################################
 * ## scroall bars for elemntes
 * ##############################################
 **/
$(document).ready(function () {
  $(".menu1").mCustomScrollbar({
    theme: "minimal-dark",
    autoHideScrollbar: true,
    // langDir:$this.css("direction"),
    // axis: "yx",
    // setLangDir: true // Enable langDir setting
  });
  $(".menu").mCustomScrollbar({
    theme: "minimal-dark",
    autoHideScrollbar: true,
  });
  $(".scroall-1").mCustomScrollbar({
    theme: "minimal-dark",
    autoHideScrollbar: true,
  });
  // category horistall scroall bar
  $(".scroall-2").mCustomScrollbar({
    axis: "x",
    theme: "light-3",
    advanced: { autoExpandHorizontalScroll: true },
  });
});

$(document).ready(function () {
  function validateNumberInput(inputSelector, errorSelector) {
    $(document).on("input", inputSelector, function () {
      var $input = $(this);
      var value = $input.val().trim();
      if (/^[0-9]+$/.test(value)) {
        // Updated to allow empty input
        $input.removeClass("invalid");
        $input.next(errorSelector).hide();
      } else {
        $input.addClass("invalid");
        $input.next(errorSelector).show();
      }
    });
  }
  validateNumberInput(".number-input", ".error");
});
/**
 * ##############################################
 * ## show the right view
 * ##############################################
 **/
$(document).ready(function () {
  // Show the first h2 and make the first button active by default
  $("#view-tpe .content:first").addClass("active");
  $("#view-tpe .type-of-view:first").addClass("active");

  // Add click event to buttons
  $("#view-tpe .type-of-view").click(function () {
    // Remove active class from all buttons and h2s
    $("#view-tpe .type-of-view").removeClass("active");
    $("#view-tpe .content").removeClass("active");

    // Add active class to the clicked button
    $(this).addClass("active");

    // Get the target h2 ID from the data attribute
    var target = $(this).data("target");

    // Show the corresponding h2
    $("#" + target).addClass("active");
  });
});

$(document).ready(function () {
  // Show the first h2 and make the first button active by default
  $("#main-div .content:first").addClass("active");
  $("#main-div .btn:first").addClass("active");

  // Add click event to buttons
  $("#main-div .btn").click(function () {
    // Remove active class from all buttons and h2s
    $("#main-div .btn").removeClass("active");
    $("#main-div .content").removeClass("active");

    // Add active class to the clicked button
    $(this).addClass("active");

    // Get the target h2 ID from the data attribute
    var target = $(this).data("target");

    // Show the corresponding h2
    $("#" + target).addClass("active");
  });
});
$(document).ready(function () {
  // Show the first h2 and make the first button active by default
  $("#catego .content:first").addClass("active");
  $("#catego .btn:first").addClass("active");

  // Add click event to buttons
  $(".order-box-tow").click(function () {
    // Remove active class from all buttons and h2s
    $(".order-box-tow").removeClass("active");
    $("#catego .content").removeClass("active");

    // Add active class to the clicked button
    $(this).addClass("active");

    // Get the target h2 ID from the data attribute
    var target = $(this).data("target");

    // Show the corresponding h2
    $("#" + target).addClass("active");
  });
});

/**
 * ##############################################
 * ## remove and add classess
 * ##############################################
 **/

$(document).ready(function () {
  $('.type-of-view input[type="checkbox"]').on("change", function () {
    $('.type-of-view input[type="checkbox"]').not(this).prop("checked", false);

    if ($(this).is(":checked")) {
    } else {
    }
  });
});

$(document).ready(function () {
  // Handle main nav links
  $(".nav-link-1").on("click", function () {
    $(".nav-link-1").removeClass("active-link-one");
    $(this).addClass("active-link-one");
  });
  // Handle category items
  $(".order-box-tow").on("click", function () {
    $(".order-box-tow").removeClass("active-three");
    $(this).addClass("active-three");
  });

  // Handle dropdown items
  $(".dropdown-item").on("click", function () {
    $(".dropdown-item").removeClass("active-link-one");
    $(this).addClass("active-link-one");
  });
});

/**
 * ##############################################
 * ## 1_ auto filtter code
 * ##############################################
 **/
$(function ($) {
  $.autofilter({
    showClass: "",
    animation: true,
    duration: 100,
  });
});

$(document).ready(function () {
  $(".toggle-btn").on("click", function () {
    var $toggleCircle = $(this).find(".toggle-circle");
    var $content = $(this).closest(".toggle-block").find(".content-to-toggle");
    var onText = $(this).data("on-text");
    var offText = $(this).data("off-text");

    // Toggle the content based on the current state
    if ($toggleCircle.hasClass("bg-custom-color")) {
      // Currently on (نعم), turn off (لا)
      $content.show();
      $toggleCircle.removeClass("bg-custom-color");
    } else {
      // Currently off (لا), turn on (نعم)
      $content.hide();
      $toggleCircle.addClass("bg-custom-color");
    }
  });
});
$(document).ready(function () {
  $("#other-checkbox").change(function () {
    if (this.checked) {
      $("#content-to-toggle").show();
    } else {
      $("#content-to-toggle").hide();
    }
  });
});


$(document).ready(function () {
  var $stickyqr = $('.barcode-img');
  $(window).on('scroll', function () {
    var scrollTop = $(window).scrollTop();

    // Show/hide the category slider based on scroll position
    if (scrollTop > 0) {
      $stickyqr.css({
        position: "fixed",
        // position: "sticky",
        top: "76px",
        // width: "100%",
        "z-index": "2", // Ensures the div is above other content
      });
    } else {
      $stickyqr.css({
        position: "relative",
        top: "0px",
        // width: "100%",
        "z-index": "2", // Ensures the div is above other content
      });
    }
  });
});



// ##############################
// ####  select one checkbox  ###
// ##############################
$(document).ready(function () {
  $('.single-checkbox').on('change', function () {
    // Uncheck all checkboxes
    $('.single-checkbox').not(this).prop('checked', false);

    // Show/Hide hidden box based on the state of the second checkbox
    if ($('#checkbox2').is(':checked')) {
      $('#hiddenBox2').show();
    } else {
      $('#hiddenBox2').hide();
    }
    if ($('#checkbox3').is(':checked')) {
      $('#hiddenBox3').show();
    } else {
      $('#hiddenBox3').hide();
    }
    if ($('#checkbox4').is(':checked')) {
      $('#hiddenBox4').show();
    } else {
      $('#hiddenBox4').hide();
    }
  });
  $('.single-checkbox2').on('change', function () {
    $('.single-checkbox2').not(this).prop('checked', false);
  });
});


$(document).ready(function () {
  // Show the first h2 and make the first button active by default
  $("#catego .content:first").addClass("active");
  $("#catego .btn:first").addClass("active");

  // Add click event to buttons
  $(".order-box-tow33").click(function () {
    // Remove active class from all buttons and h2s
    $(".order-box-tow33").removeClass("active-user-link");
    $("#catego .content").removeClass("active");

    // Add active class to the clicked button
    $(this).addClass("active-user-link");

    // Get the target h2 ID from the data attribute
    var target = $(this).data("target");

    // Show the corresponding h2
    $("#" + target).addClass("active");
  });
});

/**
 * ##############################################
 * ##  3- hid and show passwoed field
 * ##############################################
 **/
$(document).ready(function () {
  $('.toggle-password').on('click', function () {
    // Toggle the type attribute
    const passwordField = $(this).siblings('.password');
    const type = passwordField.attr('type') === 'password' ? 'text' : 'password';
    passwordField.attr('type', type);

    // Toggle the icon
    $(this).toggleClass('fa-eye fa-eye-slash');
  });
});

/**
 * ##############################################
 * ##  country slect
 * ##############################################
 **/
$("#country_selector").countrySelect({
  defaultCountry: "sa",
  // onlyCountries: ['us', 'gb', 'ch', 'ca', 'do'],
  // responsiveDropdown: true,
  preferredCountries: ['ca', 'gb', 'us']
});
$("#country_selector2").countrySelect({
  defaultCountry: "sa",
  // onlyCountries: ['us', 'gb', 'ch', 'ca', 'do'],
  // responsiveDropdown: true,
  preferredCountries: ['ca', 'gb', 'us']
});