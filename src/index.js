/**
 * Created by Julien on 2019/2/27.
 */

import csv2, { csv } from './libs/csv2json'
import fetch2, { fetch } from './libs/stock/fetch/index'
import tdx2, { tdx } from './libs/tdx'

export default {
    csv: csv2,
    fetch: fetch2,
    tdx: tdx2
}

export {csv, fetch, tdx}
