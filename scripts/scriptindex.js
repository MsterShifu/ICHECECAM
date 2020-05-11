function Recherche() {
      
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("Larecherche");
    filter = input.value.toUpperCase();
    table = document.getElementById("Lesskins");
    tr = table.getElementsByTagName("tr");
  
    // Boucle qui passe toute les lignes de la liste et qui cachent ceux qui correspondent pas à la recherche
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[0];
      if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }
    }
  }
