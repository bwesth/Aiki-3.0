// This short script allows us to use Bootstrap v4's tooltips through JQuery.
// It can't be included as an inline script in index.html as Chromes security policy does not allow for inline scripts.
// https://getbootstrap.com/docs/4.0/components/tooltips/
$(document).ready(function () {
  $('[data-toggle="tooltip"]').tooltip({
    delay: {
      show: 600,
      hide: 0,
    },
  });
});
