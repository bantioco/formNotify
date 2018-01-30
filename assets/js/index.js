
(function( $ ){

    $.fn.formNotify = function( options ) {

        var config= {
            "uppercase"     : true,
            "lowercase"     : true,
            "specialcase"   : true,
            "lengthcase"    : 8,
            "numbercase"    : true,
            "callback"      : null
        };
        var params = $.extend(config, options);

        let makeid = ()=> {
            var text = "";
            var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

            for (var i = 0; i < 5; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));

            return text;
        }

        let hasUpperCase = ( str )=> {

            if(str.toLowerCase() != str) {

                return true;
            }
            return false;
        }

        let hasLowerCase = ( str )=> {

            if(str.toUpperCase() != str) {

                return true;
            }
            return false;
        }

        let hasNumber = ( str )=> {
            let check = /\d/.test( str )
            return /\d/.test( str );
        }

        let upper_case = ( $this,value, uniqid )=> {

            let getuppercase = hasUpperCase(value)

            if( config.uppercase === true && getuppercase === true ){

                if( !$('#'+uniqid+'[data-name="upper-case"]').is(':visible') ){
                    $('#'+uniqid+'_formNotify').append('<div id="'+uniqid+'" class="plugin_formNotify" data-name="upper-case">OK uppercase</div>')
                }
            }
            else{
                $('div[data-name="upper-case"]').remove()
            }

        }

        let lower_case = ( $this,value, uniqid )=> {

            let getlowercase = hasLowerCase(value)

            if( config.lowercase === true && getlowercase === true ){

                if( !$('#'+uniqid+'[data-name="lower-case"]').is(':visible') ){
                    $('#'+uniqid+'_formNotify').append('<div id="'+uniqid+'" class="plugin_formNotify" data-name="lower-case">OK lowercase</div>')
                }
            }
            else{
                $('div[data-name="lower-case"]').remove()
            }
        }


        let length_case = ( $this,value, uniqid )=> {

            if( value.length >= config.lengthcase  ){

                if( !$('#'+uniqid+'[data-name="length-case"]').is(':visible') ){
                    $('#'+uniqid+'_formNotify').append('<div id="'+uniqid+'" class="plugin_formNotify" data-name="length-case">OK length '+config.lengthcase+'</div>')
                }
            }
            else{

                $('div[data-name="length-case"]').remove()

            }
        }


        let number_case = ( $this,value, uniqid )=> {

            let getnumber = hasNumber( value )

            if( config.numbercase === true && getnumber === true ){

                if( !$('#'+uniqid+'[data-name="number-case"]').is(':visible') ){
                    $('#'+uniqid+'_formNotify').append('<div id="'+uniqid+'" class="plugin_formNotify" data-name="number-case">OK number</div>')
                }
            }
            else{
                $('div[data-name="number-case"]').remove()
            }
        }

        let special_case = ( $this,value, uniqid )=> {

            var format = /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;

            let check = format.test(value)

            if( config.specialcase === true && check === true ){

                if( !$('#'+uniqid+'[data-name="special-case"]').is(':visible') ){
                    $('#'+uniqid+'_formNotify').append('<div id="'+uniqid+'" class="plugin_formNotify" data-name="special-case">OK specialcase</div>')
                }
            }
            else{
                $('div[data-name="special-case"]').remove()
            }

        }

        let get_case_condition = ($this,value, uniqid)=> {

            length_case( $this, value, uniqid )

            lower_case( $this, value, uniqid )

            upper_case( $this, value, uniqid )

            number_case( $this, value, uniqid )

            special_case( $this, value, uniqid )
        }


        return this.find('input').each(function(i, e){

            let $this   = $(this)
            let type    = $this.attr('type')
            let uniqid  = makeid();

            if( type === "password" ){

                if( !$('#'+uniqid+'_formNotify').is(':visible') ){
                    $('<div id="'+uniqid+'_formNotify" class="plugin_formNotify_block"></div>').insertAfter($this)
                }

                $this.off('keyup keydown change').on('keyup keydown change', function(){

                    let value = $this.val()

                    get_case_condition( $this, value, uniqid )
                })
            }

        })


    }

})( jQuery );
