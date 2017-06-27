import Service from './Service';
import request from 'superagent';
import $ from 'jquery';

export default class RecordService extends Service {

  constructor(props) {
    super(Object.merge({
      serviceUrl:"http://localhost:3000"
    },props));
  }

  list(domainObject,view = null) {
     return request.get(this.props.serviceUrl+"/o/"+domainObject+"rec").
        then((response) => response.body)
     ;
  }

  create(domainObject,data) {
     return request.post(this.props.serviceUrl+"/o/"+domainObject+"/rec",data).
        then((response) => response.body)
     ;
  }

  update(id,data) {
    return request.put(this.props.serviceUrl+"/rec/"+id,data).
       then((response) => response.body)
    ;
  }

  get(id) {
    return request.get(this.props.serviceUrl+"/rec/"+id).
       then((response) => response.body)
    ;
  }



}
