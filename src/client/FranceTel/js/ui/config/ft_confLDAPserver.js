/*
 Document   : ft_confLDAPserver.js
 Created on : Mar 02, 2009, 6:18:51 PM
 Author     : Loi.Vo
 Description:
 */
function FT_confLDAPserver (name, callback, busLayer) {
    var thisObjName = 'FT_confLDAPserver';
	var thisObj = this;
    this.m_form = undefined;		
    
    /**
     * @param name - name of configuration screens.
     * @param callback - a container callback
     * @param busLayer - business object
     */
    this.constructor = function(name, callback, busLayer)
    {
        FT_confLDAPserver.superclass.constructor(name, callback, busLayer);
    }	

	this.constructor(name, callback, busLayer);
		
    this.f_init = function()
    {
        this.f_setConfig( {
			id : 'conf_ldap_srv',
			items: [ {
				v_type: 'label',
				id: 'conf_ldap_srv_location_label',
				text: g_lang.m_ldapSrvLoc,			
				font_weight : 'bold',	
				v_new_row : 'true'
			}, {
				v_type: 'empty',
				v_new_row: 'true',
				v_end_row: 'true'
			}, {
				v_type: 'html',
				id: 'conf_ldap_srv_in_oa',
				padding : '30px',
				size: '30',
				text: '<input id="conf_ldap_srv_in_oa" type="radio" name="loc_group" value="oa" checked>&nbsp;' + g_lang.m_ldapInOA,
                v_new_row: 'true',
				v_end_row: 'true'
			}, {
				v_type: 'empty',
				v_new_row: 'true',
				v_end_row: 'true'
			}, {
				v_type: 'html',
				id: 'conf_ldap_srv_in_ldap',
				padding : '30px',				
				size: '30',
				text: '<input id="conf_ldap_srv_in_ldap" type="radio" name="loc_group" value="lan">&nbsp;' + g_lang.m_ldapInLan,
				v_new_row: 'true',
				v_end_row: 'true'
			}, {
				v_type: 'empty',
				v_new_row: 'true',
				v_end_row: 'true'
			}, {
				v_type: 'label',
				id: 'conf_ldap_srv_server_addr_label',
				padding : '60px',				
				text: g_lang.m_ldapSrvAddr,
				v_new_row: 'true'
			}, {
				v_type: 'text',
				id : 'conf_ldap_srv_server_addr',				
				size: '64',
				v_end_row: 'true'
			}, {
				v_type: 'label',
				id: 'conf_ldap_srv_user_update_label',
				padding : '60px',				
				text: g_lang.m_ldapUsrUpdateRt,
				v_new_row: 'true'
			}, {
				v_type: 'text',
				id: 'conf_ldap_srv_user_update',
				size: '64',
				v_end_row: 'true'
			}, {
				v_type: 'label',
				id: 'conf_ldap_srv_user_update_passwd_label',
				padding : '60px',					
				text: g_lang.m_formPassword,
				v_new_row: 'true'
			}, {
				v_type: 'password',
				id: 'conf_ldap_srv_user_update_passwd',
				size: '64',
				v_end_row: 'true'				
			}, {
				v_type: 'label',
				id: 'conf_ldap_srv_user_read_label',
				padding : '60px',					
				text: g_lang.m_ldapUsrReadRt,
				v_new_row: 'true'
			}, {
				v_type: 'text',
				id: 'conf_ldap_srv_user_read',
				size: '64',
				v_end_row: 'true'
			}, {
				v_type: 'label',
				id: 'conf_ldap_srv_user_read_passwd_label',
				padding : '60px',					
				text: g_lang.m_formPassword,
				v_new_row: 'true'
			}, {
				v_type: 'password',
				id: 'conf_ldap_srv_user_read_passwd',
				size: '64',
				v_end_row: 'true'					
			}],				
			buttons: [ {
				id: 'conf_ldap_server_apply_button',
				text: 'Apply',
				onclick: this.f_handleClick
			}, {
				id: 'conf_ldap_server_cancel_button',
				text: 'Cancel',
				onclick: this.f_handleClick
			}]
		})  
    }
	
    this.f_loadVMData = function(element)
    {
        thisObj.m_form = document.getElementById('conf_ldap_srv' + "_form");			
    }
    
    this.f_stopLoadVMData = function()
    {
    }
	
	this.f_validate = function() 
	{
        var error = g_lang.m_formFixError + '<br>';
        var errorInner = '';
        if (thisObj.m_form.conf_ldap_srv_in_oa.checked == true) {
			return true;
		}
        if (!thisObj.f_checkIP(thisObj.m_form.conf_ldap_srv_server_addr.value)) {
            if (!thisObj.f_checkHostname(thisObj.m_form.conf_ldap_srv_server_addr.value)) {
                errorInner += thisObj.f_createListItem(g_lang.m_ldapSrvAddr + ' ' + g_lang.m_formInvalid);
            }
        }	
						
		errorInner = thisObj.f_checkEmpty(thisObj.m_form.conf_ldap_srv_user_update, g_lang.m_ldapUsrUpdateRt + ' ' + g_lang.m_formNoEmpty, errorInner);
		errorInner = thisObj.f_checkEmpty(thisObj.m_form.conf_ldap_srv_user_update_passwd, g_lang.m_ldapPasswdUpdateRt + ' ' + g_lang.m_formNoEmpty, errorInner);
		errorInner = thisObj.f_checkEmpty(thisObj.m_form.conf_ldap_srv_user_read, g_lang.m_ldapUsrReadRt + ' ' + g_lang.m_formNoEmpty, errorInner);
		errorInner = thisObj.f_checkEmpty(thisObj.m_form.conf_ldap_srv_user_read_passwd, g_lang.m_ldapPasswdReadRt + ' ' + g_lang.m_formNoEmpty, errorInner);
			   		   
        if (errorInner.trim().length > 0) {
            error = error + '<ul style="padding-left:30px;">';
            error = error + errorInner + '</ul>';
            g_utils.f_popupMessage(error, 'error', g_lang.m_error,true);
			return false;
        }

        return true;		
		
	}
	
	this.f_apply = function()
	{
		
	}
	
	this.f_reset = function()
	{
		
	}
    
    this.f_handleClick = function(e)
    {
        var target = g_xbObj.f_xbGetEventTarget(e);
        if (target != undefined) {
            var id = target.getAttribute('id');
            if (id == 'conf_ldap_server_apply_button') { //apply clicked
                if (!thisObj.f_validate()) {
					return false;
				}
                thisObj.f_apply();
            } else if (id == 'conf_ldap_server_cancel_button') { //cancel clicked
                thisObj.f_reset();               
            }
        }
    }	    
}

FT_extend(FT_confLDAPserver, FT_confFormObj);