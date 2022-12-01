// Kun dokumentti (sivu) on valmis (latautunut)...
$(document).ready(function () {
  // ... hae lista local storagesta
$("ul").html(localStorage.getItem("tasks"));
  // Valitaan <form> ja odotetaan sen lähetystä (submit)
	$("form").submit(function(e) {
		e.preventDefault();
    // Määritetään muuttuja li ja asetetaan se poimimaan form inputin arvo (syötetty teksti)
		var li = $("input[type=text]").val();
    // Toteutuu aina, jos kenttää ei ole jätetty tyhjäksi
		if (li) {
      // Listarivin muotoilu ja lisäys listaan (ul), sekä ensin piilotus ja sitten häivytys esille (jotta häivytys toimii)
			$('<li><input type="checkbox" class="check">' + li + '<i class="fa fa-trash"></i></li>').appendTo("ul").hide().fadeIn(300);
      // Päivitetään local storagen tila = lisätään local storageen
			localStorage.setItem("tasks", $("ul").html());
      // Tyhjennetään tekstikenttä (input)
			$("input[type=text]").val("");
    // Jos kenttä on jätetty tyhjäksi, näytetään alert-laatikko ja ohjeistetaan
		} else {
      alert("Saiturin joulu on ankea!\n\n Älä jätä kenttää tyhjäksi.");
    }
	});
  
  // --- Poistonappi ---
  // Valitaan poistonappi, klikatessa suoritetaan funktio
  $(document).on("click", ".fa-trash", function() {
    // Valitaan poistonapin ympärillä oleva listaustagi (<li>) ja määritetään sille häivyttyminen pois näkyvistä,
    // kun elementti poistetaan napista painamalla
    $(this).parent().fadeOut(300, function() {
      $(this).remove();
      // Päivitetään local storagen tila = poistetaan local storagesta
      localStorage.setItem("tasks", $("ul").html());
    });
  });

  // --- Listan tilan päivitys ---
  // Valitaan checkbox, tilan muuttuessa suoritetaan funktio
	$(document).on("change", ".check", function() {
    // Jos checkbox on valittu ja sitä klikataan, poistetaan attribuutti checked ()
		if($(this).attr("checked")) {
			$(this).removeAttr("checked");
    // Jos checkboxia ei ole valittu ja sitä klikataan, lisätään sille attribuutti checked (checked="checked")
		} else {
			$(this).attr("checked", "checked");
		}
    // Valitaan checkboxin ympärillä oleva listaustagi (<li>) ja määritetään sille class="completed", kun checkboxia on klikattu
    // Class poistuu, kun checkbox klikataan pois checked-tilasta
		$(this).parent().toggleClass("completed");
    // Päivitetään local storagen tila = päivitetään "tehtävän valmistumisen" tila (checked ja completed)
		localStorage.setItem("tasks", $("ul").html());
	});
});