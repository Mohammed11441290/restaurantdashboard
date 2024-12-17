// Arabic locale settings
// const arabicLocale = {
//     months: ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'],
//     monthsShort: ['ينا', 'فبر', 'مار', 'أبر', 'ماي', 'يون', 'يول', 'أغس', 'سبت', 'أكت', 'نوف', 'ديس'],
//     weekdays: ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'],
//     weekdaysShort: ['أحد', 'اثن', 'ثلاث', 'أربع', 'خميس', 'جمع', 'سبت'],
//     weekdaysMin: ['ح', 'ن', 'ث', 'ر', 'خ', 'ج', 'س'],
//     today: 'اليوم',
//     clear: 'مسح',
//     dateFormat: 'dd/MM/yyyy',
//     firstDay: 0
// };

// Initialize the datepicker with various options
// new AirDatepicker('#datepicker', {
//     locale: arabicLocale,                // Set locale to Arabic
//     dateFormat: 'dd/MM/yyyy',            // Date format
//     minDate: new Date(),                 // Minimum selectable date
//     maxDate: new Date(2025, 11, 31),     // Maximum selectable date
//     defaultDate: new Date(),             // Default date
//     startDate: new Date(),               // Initially visible month/year
//     firstDay: 6,                         // First day of the week (Saturday)
//     disableNavWhenOutOfRange: true,      // Disable navigation buttons when out of range
//     disableDate: [
//         new Date(2024, 6, 4),            // Disable specific date
//         {start: new Date(2024, 6, 10), end: new Date(2024, 6, 15)}  // Disable date range
//     ],
//     highlightedDates: [
//         new Date(2024, 6, 18),           // Highlight specific date
//         {start: new Date(2024, 6, 20), end: new Date(2024, 6, 25)}  // Highlight date range
//     ],
//     inline: false,                       // Display datepicker inline
//     multipleDates: false,                // Allow selection of multiple dates
//     range: false,                        // Enable date range selection
//     timepicker: false,                   // Enable time picker
//     position: 'bottom left',             // Positioning of the dropdown
//     buttons: ['today', 'clear'],         // Add buttons to the datepicker
//     onSelect: function(date, formattedDate, datepicker) {
//         console.log('Selected date:', formattedDate);
//     },
//     onShow: function(inst, animationCompleted) {
//         console.log('Datepicker shown');
//     },
//     onHide: function(inst, animationCompleted) {
//         console.log('Datepicker hidden');
//     },
//     onChangeMonth: function(month, year) {
//         console.log('Month changed to:', month, year);
//     },
//     onChangeView: function(view) {
//         console.log('View changed to:', view);
//     }
// });

// Initialize the datepicker with Arabic month names
const arabicLocale = {
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
    "أكتوبر",
    "نوفمبر",
    "ديسمبر",
  ],
  monthsShort: [
    "ينا",
    "فبر",
    "مار",
    "أبر",
    "ماي",
    "يون",
    "يول",
    "أغس",
    "سبت",
    "أكت",
    "نوف",
    "ديس",
  ],
  weekdays: [
    "الأحد",
    "الاثنين",
    "الثلاثاء",
    "الأربعاء",
    "الخميس",
    "الجمعة",
    "السبت",
  ],
  weekdaysShort: ["أحد", "اثن", "ثلاث", "أربع", "خميس", "جمع", "سبت"],
  weekdaysMin: ["ح", "ن", "ث", "ر", "خ", "ج", "س"],
  today: "اليوم",
  clear: "مسح",
  dateFormat: "dd/MM/yyyy",
  firstDay: 0,
};
const arabicLocaletime = {
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
    "أكتوبر",
    "نوفمبر",
    "ديسمبر",
  ],
  monthsShort: [
    "ينا",
    "فبر",
    "مار",
    "أبر",
    "ماي",
    "يون",
    "يول",
    "أغس",
    "سبت",
    "أكت",
    "نوف",
    "ديس",
  ],
  weekdays: [
    "الأحد",
    "الاثنين",
    "الثلاثاء",
    "الأربعاء",
    "الخميس",
    "الجمعة",
    "السبت",
  ],
  weekdaysShort: ["أحد", "اثن", "ثلاث", "أربع", "خميس", "جمع", "سبت"],
  weekdaysMin: ["ح", "ن", "ث", "ر", "خ", "ج", "س"],
  today: "اليوم",
  clear: "مسح",
  // dateFormat: 'dd/MM/yyyy',
  firstDay: 0,
};
document.querySelectorAll(".datepicker1").forEach(function (element) {
  new AirDatepicker(element, {
    locale: arabicLocale,
    autoClose: true,
    clear: "حذف",
    // position: "bottom right ",
    timepicker: false,
    isMobile: true,
  });
});
document.querySelectorAll(".datepicker1-l").forEach(function (element) {
  new AirDatepicker(element, {
    locale: arabicLocale,
    autoClose: true,
    clear: "حذف",
    position: "bottom right ",
    timepicker: false,
    isMobile: true,

  });
});
document.querySelectorAll(".datepicker2").forEach(function (element) {
  new AirDatepicker(element, {
    locale: arabicLocale,
    autoClose: true,
    clear: "حذف",
    timepicker: false,
    dateFormat: "yyyy",
    isMobile: true,
  });
});
document.querySelectorAll(".datepicker4").forEach(function (element) {
  new AirDatepicker(element, {
    locale: arabicLocale,
    autoClose: true,
    position: "bottom right ",
    clear: "حذف",
    timepicker: false,
    dateFormat: "yyyy",
    isMobile: true,
  });
});
document.querySelectorAll(".datepicker3").forEach(function (element) {
  new AirDatepicker(element, {
    locale: arabicLocale,
    autoClose: true,
    clear: "حذف",
    timepicker: false,
    dateFormat: "MM",
    isMobile: true,
  });
});
new AirDatepicker("#userinfodateselector2", {
  locale: arabicLocale,
  autoClose: true,
  clear: "حذف",
  timepicker: false,
  isMobile: true,
});
document.querySelectorAll(".timepicker").forEach(function (element) {
  new AirDatepicker(element, {
    locale: arabicLocaletime,
    autoClose: true,
    clear: "حذف",
    timepicker: true,
    onlyTimepicker: true,
    timeFormat: "hh:mm AA",
    isMobile: true,
    onSelect: function (date, formattedDate, datepicker) {
      console.log("Selected time:", formattedDate);
    },
  });
});
document.querySelectorAll(".datetimepicker").forEach(function (element) {
  new AirDatepicker(element, {
    locale: arabicLocaletime,
    autoClose: true,
    clear: "حذف",
    timepicker: true,
    isMobile: true,
    onlyTimepicker: false,
    dateFormat: "dd/MM/yyyy",
    timeFormat: "hh:mm AA",
    onSelect: function (date, formattedDate, datepicker) {
      console.log("Selected time:", formattedDate);
    },
  });
});
// new AirDatepicker('#timpickers22', {
//     locale: arabicLocaletime,
//     autoClose: true,
//     clear: 'حذف',
//     timepicker: true,
//     onlyTimepicker:true,
//     timeFormat:'hh:mm AA',
//     onSelect: function(date, formattedDate, datepicker) {
//         console.log('Selected time:', formattedDate);
//     }
// });
