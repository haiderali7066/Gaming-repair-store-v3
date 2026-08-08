import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { connectToDatabase } from "@/lib/mongodb"
import { formatCurrency, formatDate } from "@/lib/helpers"
import { Product } from "@/models/Product"
import { Order } from "@/models/Order"
import { User } from "@/models/User"
import { RepairRequest } from "@/models/RepairRequest"
import { BuyBackRequest } from "@/models/BuyBackRequest"

export default async function DashboardPage() {
  await connectToDatabase()

  const [
    productCount,
    orderCount,
    customerCount,
    repairCount,
    buybackCount,
    orders,
    repairs,
    buybacks,
  ] = await Promise.all([
    Product.countDocuments({ published: true }),
    Order.countDocuments(),
    User.countDocuments({ role: "customer" }),
    RepairRequest.countDocuments(),
    BuyBackRequest.countDocuments(),
    Order.find().sort({ createdAt: -1 }).limit(5).populate("userId", "name"),
    RepairRequest.find().sort({ createdAt: -1 }).limit(5).populate("userId", "name"),
    BuyBackRequest.find().sort({ createdAt: -1 }).limit(5).populate("userId", "name"),
  ])

  const totalRevenue = orders.reduce((sum: number, order: any) => sum + (order.subtotal || 0), 0)
  const repairsByStatus = {
    submitted: repairs.filter((r: any) => r.status === "submitted").length,
    inProgress: repairs.filter((r: any) => r.status === "in-progress").length,
    completed: repairs.filter((r: any) => r.status === "completed").length,
  }
  const buybackByStatus = {
    submitted: buybacks.filter((b: any) => b.status === "submitted").length,
    quoted: buybacks.filter((b: any) => b.status === "quoted").length,
    accepted: buybacks.filter((b: any) => b.status === "accepted").length,
  }

  return (
    <main className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Overview of your business metrics and recent activity</p>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Active Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{productCount}</div>
            <p className="mt-1 text-xs text-muted-foreground">Published and active</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{orderCount}</div>
            <p className="mt-1 text-xs text-muted-foreground">All time</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Customers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{customerCount}</div>
            <p className="mt-1 text-xs text-muted-foreground">Registered accounts</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Repair Requests</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{repairCount}</div>
            <p className="mt-1 text-xs text-muted-foreground">All services</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Buy-Back Requests</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{buybackCount}</div>
            <p className="mt-1 text-xs text-muted-foreground">Acquisitions</p>
          </CardContent>
        </Card>
      </div>

      {/* Revenue & Service Status */}
      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-1">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{formatCurrency(totalRevenue)}</div>
            <p className="mt-1 text-xs text-muted-foreground">From all orders</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Repair Status</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Pending</span>
              <span className="font-semibold text-blue-600">{repairsByStatus.submitted}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">In Progress</span>
              <span className="font-semibold text-yellow-600">{repairsByStatus.inProgress}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Completed</span>
              <span className="font-semibold text-green-600">{repairsByStatus.completed}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Buy-Back Status</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Under Review</span>
              <span className="font-semibold text-blue-600">{buybackByStatus.submitted}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Quoted</span>
              <span className="font-semibold text-cyan-600">{buybackByStatus.quoted}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Accepted</span>
              <span className="font-semibold text-green-600">{buybackByStatus.accepted}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="grid gap-4 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Recent Orders</CardTitle>
            <CardDescription>Latest customer purchases</CardDescription>
          </CardHeader>
          <CardContent>
            {orders.length === 0 ? (
              <p className="text-sm text-muted-foreground">No orders yet</p>
            ) : (
              <div className="space-y-3">
                {orders.map((order: any) => (
                  <div key={order._id} className="flex justify-between border-b pb-2 text-sm">
                    <div>
                      <p className="font-medium">{order.userId?.name}</p>
                      <p className="text-xs text-muted-foreground">{formatDate(order.createdAt)}</p>
                    </div>
                    <p className="font-semibold">{formatCurrency(order.subtotal)}</p>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Recent Repairs</CardTitle>
            <CardDescription>Latest service requests</CardDescription>
          </CardHeader>
          <CardContent>
            {repairs.length === 0 ? (
              <p className="text-sm text-muted-foreground">No repairs yet</p>
            ) : (
              <div className="space-y-3">
                {repairs.map((repair: any) => (
                  <div key={repair._id} className="flex justify-between border-b pb-2 text-sm">
                    <div>
                      <p className="font-medium">
                        {repair.brand} {repair.model}
                      </p>
                      <p className="text-xs text-muted-foreground">{repair.userId?.name}</p>
                    </div>
                    <span className="rounded bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-800">
                      {repair.status}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Recent Buy-Back</CardTitle>
            <CardDescription>Latest device submissions</CardDescription>
          </CardHeader>
          <CardContent>
            {buybacks.length === 0 ? (
              <p className="text-sm text-muted-foreground">No submissions yet</p>
            ) : (
              <div className="space-y-3">
                {buybacks.map((buyback: any) => (
                  <div key={buyback._id} className="flex justify-between border-b pb-2 text-sm">
                    <div>
                      <p className="font-medium">
                        {buyback.brand} {buyback.model}
                      </p>
                      <p className="text-xs text-muted-foreground">{buyback.userId?.name}</p>
                    </div>
                    <span className="rounded bg-cyan-100 px-2 py-0.5 text-xs font-medium text-cyan-800">
                      {buyback.offeredPrice ? formatCurrency(buyback.offeredPrice) : "—"}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
