/**
 * HdM Kostenrechner Digitaldruck
 * Copyright (C) 2010 Simon Wallmann
 *
 * This program is free software: you can redistribute it and/or
 * modify it under the terms of the GNU Lesser General Public
 * License as published by the Free Software Foundation, either
 * version 2.1 of the License, or (at your option) any later version.
 * 
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU
 * Lesser General Public License for more details.
 * 
 * You should have received a copy of the GNU Lesser General Public
 * License along with this program. If not, please visit the Free
 * Software Foundation website at http://www.gnu.org/licenses/.
 *
 * PHP version 5
 * @copyright  2010 Simon Wallmann
 * @author     2010 Simon Wallmann <s.wallmann@kompsoft.de>
 * @license    LGPL
 * @version		 1.0r36
 */

(function($){
	$.fn.extend({ 
 		
 		hdm_rendersumm: function(options) {
 			var endsumme = 0;
			$(this).each(function() {
				endsumme = endsumme+parseFloat($(this).text());
			});
			$("#hdm_calc_gsumm").html(endsumme.toFixed(2));
 		},
 		
 		// Add new table row
 		hdm_addrow: function(options) {
 			var defaults = {
 				machine		:	"xerox",
				add_table :	".xerox_table",
				calc_class:	".calc_xerox"
			}
			
			var options =  $.extend(defaults, options);
 			$(this).live("click",function(){
 				if(options.machine == "lfp"){
 					$(options.add_table).append($(options.calc_class).hdm_newrow_lfp());
 					$('.calc_lfp:last').hdm_lfp_papertype();
 				}else{
					$(options.add_table).append($(options.calc_class).hdm_newrow_xerox());
 				}
				colorTable(options.calc_class);
				$(this).hide();
			});
		},
 		
 		// delete existing table row
 		hdm_delrow: function(options) {
 			var defaults = {
 				add_button		:	".addXeroxRow"
			}
 			var options =  $.extend(defaults, options);
 			
 			$(this).live("click",function(){
 				if($(options.add_button).length > 1){
					$(this).closest("tr").remove();
 				}
				$(".summe").hdm_rendersumm();

				// add (+) button if deleting last row
				if($(options.add_button+':last').is(':hidden')){ 
					$(options.add_button+':last').show();
				}
			});
 		},
 		
 		// LFP: change dropdown roll/sheet
 		hdm_lfp_papertype: function(options) {
 			
 			// Rollenpapiere: Format
 			var paper_roll = [
				{ name: 'DIN A1', value: 0 },
				{ name: 'DIN A2', value: 1 },
				{ name: 'laufende Meter', value: 2 }
			]
			
			// Rollenpapiere: Papiertypen
			var roll_papertypes = [
				{ name: 'Fotopapier seidenmatt 190g/qm', value: 0 },
				{ name: 'Fotopapier glänzend 190g/qm', value: 1 },
				{ name: 'Proofingpapier 200g/qm', value: 2 }
			]
			
			// Bogenpapiere: Format
			var paper_sheet = [
				{ name: 'DIN A3', value: 0 },
				{ name: 'DIN A4', value: 1 }
			]
			
			// Bogenpapiere: Papiertypen
			var sheet_papertypes = [
				{ name: 'Fotopapier seidenmatt 190g/qm', value: 0 }
			]

			// Dropdowns befüllen
			if($('.papertype', this).val() == '1'){
				populateSelect($('.papersize', this).get(0), paper_sheet);
				populateSelect($('.papersort', this).get(0), sheet_papertypes);
			}else{
				populateSelect($('.papersize', this).get(0), paper_roll);
				populateSelect($('.papersort', this).get(0), roll_papertypes);
			}
 		},
 		
 		// New row LFP Template
 		hdm_newrow_lfp: function(options) {
 			var n = $(this).length+1;
 			var text =	'<tr class="calc_lfp">'+
									'<td><span class="rowNumber">'+n+'</span></td>'+
									'<td><input name="plength" class="plength" type="text" value="0" size="5" maxlength="6" /> <span class="hdm_calc_lm"></span></td>'+
									'<td><select name="papertype" class="papertype" size="1">'+
									'<option value="0">Rolle</option>'+
									'<option value="1">Bogenware</option>'+
									'</select></td>'+
									'<td><select name="papersize" class="papersize" size="1">'+
									'<option value="0">DIN A1</option>'+
									'<option value="1">DIN A2</option>'+
									'<option value="2">DIN A3</option>'+
									'<option value="3">DIN A4</option>'+
									'<option value="4" selected>laufende Meter</option>'+
									'</select></td>'+
									'<td><select name="papersort" class="papersort" size="1">'+
									'<option value="0">matt gestrichen</option>'+
									'<option value="1">glänzend</option>'+
									'<option value="2">natur</option>'+
									'</select></td>'+
									'<td class="hdm_calc_midsumm"><span class="summe">0.00</span> &#8364;</td>'+
									'<td class="hdm_calc_buttons">'+
									'<ul class="icons ui-widget ui-helper-clearfix">'+
									'<li class="addLfpRow ui-state-default ui-corner-all"><span class="ui-icon ui-icon-circle-plus"></span></li>'+
									'<li class="delLfpRow ui-state-default ui-corner-all"><span class="ui-icon ui-icon-circle-close"></span></li>'+
									'</ul>'+
									'</td>'+
									'</tr>';
 			return text;
 		},
 		
 		// New row XEROX Template
 		hdm_newrow_xerox: function(options) {
 			var n = $(this).length+1;
	    var text =	'<tr class="calc_xerox">'+
									'<td><span class="rowNumber">'+n+'</span></td>'+
									'<td><input name="amount" class="amount" type="text" value="0" size="3" maxlength="6" /></td>'+
									'<td><select name="paper" class="paper" size="1">'+
			      			'<option value="0">DIN A4</option>'+
			      			'<option value="1">DIN A3</option>'+
			      			'<option value="2">SRA3</option>'+
			    				'</select></td>'+
									'<td><select name="mode" class="mode" size="1">'+
			      			'<option value="0">Schwarz/Weiß</option>'+
			      			'<option value="1">Farbe</option>'+
			    				'</select></td>'+
									'<td>'+
									'<select name="weight" class="weight" size="1">'+
										'<option value="0">90g/qm</option>'+
										'<option value="1">120g/qm</option>'+
										'<option value="2">160g/qm</option>'+
										'<option value="3">200g/qm</option>'+
										'<option value="4">280g/qm</option>'+
									'</select></td>'+
									'<td><input type="checkbox" class="duplex" name="duplex" value="1" /> Doppelseitig</td>'+
									'<td class="hdm_calc_midsumm"><span class="summe">0.00</span> &#8364;</td>'+
									'<td class="hdm_calc_buttons">'+
									'<ul class="icons ui-widget ui-helper-clearfix">'+
									'<li class="addXeroxRow ui-state-default ui-corner-all"><span class="ui-icon ui-icon-circle-plus"></span></li>'+
									'<li class="delXeroxRow ui-state-default ui-corner-all"><span class="ui-icon ui-icon-circle-close"></span></li>'+
									'</ul>'+
									'</td>'+
									'</tr>';
	    return text;
 		},
 		
 		// LFP: Calculate price per row
 		hdm_calc_lfp: function(options) {
			var defaults = {
				plength		:	0,		// default paper length
				papertype :	0			// Anzahl: 0
			}
			
			var plength				= parseFloat($('.plength', this).val())
			var papersort			= $('.papersort', this).val()
			var papersize			= $('.papersize', this).val()
			var papertype			= $('.papertype', this).val()
			var zwischensumme = '0.00';
			var endsumme			= 0;
			
			// Tintenfaktor pro Format: A1, A2, laufend
			var meter_p_format	= [ 0.85, 0.42, 1.00]
			
			// Tintenpreis pro Meter
			var ink_per_meter		= 4.00;
			
			// Tintenpreis pro Meter: A4, A3
			var ink_per_sheet		= [ 0.50, 1.00 ];
			
			// Papierkosten Blattware: A4, A3
			var paper_per_sheet = [ 1.00, 2.00 ]
			
			// Papierkosten Rolle (pro Meter): Seidenmatt, glänzend, Proofpapier
			var paper_per_meter = [ 3.50, 3.50, 7.00 ];
			
			if(papertype == 1){
				// Sheet
				zwischensumme = (paper_per_sheet[papersort]+ink_per_sheet[papersize])*plength
			}else{
				// Roll
				zwischensumme = ((paper_per_meter[papersort]+ink_per_meter)*meter_p_format[papersize])*plength
			}
			
			// Zwischenbetrag errechnen
			$(".summe", this).html(zwischensumme.toFixed(2));
				
			// Endbetrag errechnen
			$(".summe").hdm_rendersumm()
 		},
 		
		// XEROX: Calculate price per row
		hdm_calc_xerox: function(options) {
	
		//Set the default values, use comma to separate the settings, example:
		var defaults = {
			duplex :	0,		// Duplex Modus: aus
			amount :	0,		// Anzahl: 0
			paper :		0,		// default: DIN A4
			weight :	0,		// default: 90g/qm
			mode :		0			// default: s/w
		}
					
		var options =  $.extend(defaults, options);
			return this.each(function() {
				
				// Preise für: 90g, 120g, 160g, 200g, 280g in Euro
				var paper_prices = []
				paper_prices[0] = [ 0.02, 0.03, 0.05, 0.07, 0.08 ];		// DIN A4
				paper_prices[1] = [ 0.03, 0.04, 0.06, 0.08, 0.10 ];		// DIN A3
				paper_prices[2] = [ 0.04, 0.05, 0.07, 0.09, 0.12 ];		// SRA3
				
				// Klickkosten für: schwarzweiss, farbig
				var click_prices = [ 0.07, 0.30 ]; 
				
				
				// Ab hier muss man nichts mehr ändern...
				var amount				= parseFloat($('.amount', this).val())
				var paper_size		= $('.paper', this).val()
				var color_mode		= $('.mode', this).val()
				var paper_weight	= $('.weight', this).val()
				var zwischensumme = '0.00';
				var endsumme			= 0;

				if($('.duplex:checked', this).val()){
					var duplex_cost		= 2;
				}else{
					var duplex_cost		= 1;
				}
				
				// Zwischenbetrag errechnen
				zwischensumme = (amount*click_prices[color_mode]*duplex_cost) + (amount*paper_prices[paper_size][paper_weight])
				$(".summe", this).html(zwischensumme.toFixed(2));
				
				// Endbetrag errechnen
				$(".summe").hdm_rendersumm()	
			});
		}
	});  
})(jQuery);

// Odd/Even colorize table row
function colorTable(id){
	$("tr"+id+":even").css("background-color", "#F4F4F8");
	$("tr"+id+":odd").css("background-color", "#EFEFEF");
}

// populates select list from array of items given as objects: { name: 'text', value: 'value' }
function populateSelect(el, items) {
	el.options.length = 0;
	//if (items.length > 0)
	//	el.options[0] = new Option('Bitte auswählen', '');

	$.each(items, function () {
		el.options[el.options.length] = new Option(this.name, this.value);
	});
}