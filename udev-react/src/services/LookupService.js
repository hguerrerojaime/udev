import Service from './Service';
import request from 'superagent';
import $ from 'jquery';

export default class LookupService extends Service {

  constructor(props) {
    super(Object.merge({
      serviceUrl:"http://localhost:3000"
    },props));
  }

  lookupList(domainObject,search = null,view = null) {

     let params = {
       q: search,
       _limit: 100
     };

     return request.get(this.props.serviceUrl+"/"+domainObject+"?"+$.param(params)).
        then((response) => response.body)
     ;
  }
  lookupKey(domainObject,key,view = null) {
    return request.get(this.props.serviceUrl+"/"+domainObject+"/"+key).
       then((response) => response.body)
    ;
  }

}
