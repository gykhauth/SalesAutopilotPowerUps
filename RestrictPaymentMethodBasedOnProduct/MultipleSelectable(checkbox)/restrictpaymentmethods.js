<script>
/**
 * Ez a program szabad szoftver; terjeszthető illetve módosítható a Free Software
 * Foundation által kiadott GNU General Public License dokumentumában leírtak;
 * akár a licenc 3-as, akár (tetszőleges) későbbi változata szerint.
 * 
 * Ez a program abban a reményben kerül közreadásra, hogy hasznos lesz, de minden
 * egyéb GARANCIA NÉLKÜL, az ELADHATÓSÁGRA vagy VALAMELY CÉLRA VALÓ
 * ALKALMAZHATÓSÁGRA való származtatott garanciát is beleértve. További
 * részleteket a GNU General Public License tartalmaz.
 * 
 * A felhasználónak a programmal együtt meg kell kapnia a GNU General Public
 * License egy példányát; ha mégsem kapta meg, akkor tekintse meg a
 * http://gnu.hu/gplv3.html oldalon.
 **/
 

mmjQuery(document).ready(function(){
    //Megadjuk a termék-fizetési mód megfeleltetést:
    //termek_fizetes_matrix['termékid'] = [fizetési módok];
    //Ha egy termék nem szerepel a mátrixban, akkor ahhoz minden fizetési mód engedélyezett
    //Ha több termék van kiválasztva, az a fizetési mód elérhető, amelyik mindegyikhez engedélyezett
    var termek_fizetes_matrix = Array();
    termek_fizetes_matrix['123456'] = [987, 2654, 321];
    termek_fizetes_matrix['789101'] = [321, 548];
    
    //Ha változik a kiválasztott termék
    mmjQuery(".prodchk").change(function() {
        //Minden módot bekapcsolunk, és kikapcsoljuk majd a nem kellő módokat
    	mmjQuery(".shippingmethodradio").parent().show();

        //Minden kiválasztott termékre
    	mmjQuery('.prodchk:checked').each( function() {
			var selected_prod = mmjQuery(this).prop('name').substr(4);

            //Ha van a termékhez korlátozás
			if(termek_fizetes_matrix[selected_prod]) {
                //Minden fizetési módra
	  			mmjQuery('.shippingmethodradio').each( function() {
                    //Ha a fizetési mód nincs a termékhez engedélyezettek között
	  				if( !termek_fizetes_matrix[selected_prod].includes(parseInt(mmjQuery(this).val())) ) {
                        //Akkor elrejtjük
	  					mmjQuery(this).parent().hide();

                        //Ha ez a mód van épp kiválasztva
	  					if( mmjQuery(this).prop('checked') ) {
                            //Akkor kikapcsoljuk a kiválasztást
	  						mmjQuery(this).prop('checked',false);
                            //És eltűntetjük az esetleges Kártyás fizetési mód blokkot
	  						mmjQuery("#online-payment-container").hide();
	  					}
	  				}
	  			});
    		}
    	});
        
        //Ha csak egy engedélyezett fizetési mód van, azt válasszuk is ki egyből
    	if (1==mmjQuery('.shippingmethodradio:visible').length) {
    		mmjQuery('.shippingmethodradio:visible').prop('checked', true);
    	}
    });
});
</script>