import 'react'

// Extend react ambient types
declare module "react" {
  const placki = 123;
}

import 'jquery'

declare module 'jquery'{

    const PlackuPLugin = {}
}

declare global {
    interface JQueryStatic{
        declare placki():void
    }

    // Declaration Merging
    interface JQueryStatic{
        declare ciastka():void
    }
}