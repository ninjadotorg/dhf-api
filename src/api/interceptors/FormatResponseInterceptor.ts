import { Action, Interceptor, InterceptorInterface } from 'routing-controllers';

@Interceptor()
export class FormatResponseInterceptor implements InterceptorInterface {
    public intercept(action: Action, content: any): any {
        return {
            status: 1,
            data: content,
        };
    }
}
