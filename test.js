$('#recreate').on('click', function() {
	var lineCounter = $('#lineCounter').val();
	var svgCounter = $('#svgCounter').val();
	var t0 = performance.now();
	var result = Birdnest.create(lineCounter,svgCounter);
	var t1 = performance.now();
	$('#charts').html(result);
	$('#testresults').append('<p> Call to create ' + svgCounter+ ' svgs with ' + lineCounter + ' lines took ' + (t1 - t0) + 'milliseconds.<p>');
});
