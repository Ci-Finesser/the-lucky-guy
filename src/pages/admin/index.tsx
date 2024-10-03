import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function AdminDashboard() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Total Supporters</CardTitle>
            <CardDescription>Number of registered supporters</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">1,234</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Local Governments</CardTitle>
            <CardDescription>Number of represented LGs</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">15</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Pending Requests</CardTitle>
            <CardDescription>Additional information requests</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">42</p>
          </CardContent>
        </Card>
      </div>
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">Supporter List</h2>
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <Input placeholder="Search supporters..." className="md:w-1/3" />
          <Select>
            <SelectTrigger className="md:w-1/4">
              <SelectValue placeholder="Filter by LG" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Local Governments</SelectItem>
              <SelectItem value="lg1">Local Government 1</SelectItem>
              <SelectItem value="lg2">Local Government 2</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="md:w-1/4">
              <SelectValue placeholder="Filter by Occupation" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Occupations</SelectItem>
              <SelectItem value="student">Student</SelectItem>
              <SelectItem value="trader">Trader</SelectItem>
              <SelectItem value="professional">Professional</SelectItem>
            </SelectContent>
          </Select>
          <Button>Export Data</Button>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Occupation</TableHead>
              <TableHead>Local Government</TableHead>
              <TableHead>Ward</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>John Doe</TableCell>
              <TableCell>Student</TableCell>
              <TableCell>Local Government 1</TableCell>
              <TableCell>Ward 2</TableCell>
              <TableCell>
                <Button variant="outline" size="sm">View</Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Jane Smith</TableCell>
              <TableCell>Trader</TableCell>
              <TableCell>Local Government 2</TableCell>
              <TableCell>Ward 1</TableCell>
              <TableCell>
                <Button variant="outline" size="sm">View</Button>
              </TableCell>
            </TableRow>
            {/* Add more rows as needed */}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}