/**
 * Created by pavan.t on 12/01/17.
 */



var Response = function(httpResponse) {
    var self = this;
    self.status = httpResponse.statusText;

    self.isOk = function() {
        if(self.status == "OK")
            return true;
        return false;
    }
}

Number.prototype.padLeft = function(base,chr){
    var  len = (String(base || 10).length - String(this).length)+1;
    return len > 0? new Array(len).join(chr || '0')+this : this;
}

Date.prototype.getSqlFormatDate = function () {
    var d = this;
    dformat = [ d.getFullYear(),(d.getMonth()+1).padLeft(),
            d.getDate().padLeft()
           ].join('-') +' ' +
        [d.getHours().padLeft(),
            d.getMinutes().padLeft(),
            d.getSeconds().padLeft()].join(':');
    return dformat;
}

Date.prototype.getSqlFormatCurrentDate = function () {
    var d = this;
    dformat = [d.getFullYear(),(d.getMonth()+1).padLeft(),
            d.getDate().padLeft()
            ].join('-') +' ' +
        ['23',
            '59',
            '59'].join(':');
    return dformat;
}
