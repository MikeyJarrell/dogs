document.querySelectorAll("table.sortable").forEach(function (table) {
  var heads = table.querySelectorAll("thead th");
  heads.forEach(function (th, col) {
    th.addEventListener("click", function () {
      var up = th.classList.contains("sorted") ? !th.classList.contains("up") : col === 0;
      heads.forEach(function (h) { h.classList.remove("sorted", "up"); });
      th.classList.add("sorted");
      if (up) th.classList.add("up");
      var body = table.tBodies[0];
      var rows = Array.prototype.slice.call(body.rows);
      rows.sort(function (a, b) {
        var x = a.cells[col], y = b.cells[col], d;
        if (x.dataset.v !== undefined) d = parseFloat(x.dataset.v) - parseFloat(y.dataset.v);
        else d = x.textContent.localeCompare(y.textContent);
        return up ? d : -d;
      });
      rows.forEach(function (r) { body.appendChild(r); });
    });
  });
});