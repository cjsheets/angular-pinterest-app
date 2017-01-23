$(function () {
  $('[rel="tooltip"]').tooltip()
  $('[rel="tooltip"]').on('click', function () {
      $(this).mouseleave();
      $(this).mouseenter();
  })
})